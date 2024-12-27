import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/db";
import { Patient, Transaction, Doctor } from "../../../models/usermodel";

connect();


export async function POST(req:NextRequest) {

    const body=await req.json();
   const {patientid,doctorid}=body;

   if(!patientid|| !doctorid){
    return NextResponse.json({ ok: false, msg: "Missing required fields" });

   }
   const session = await Transaction.startSession();
   try{
   session.startTransaction();
     const patient=await Patient.findById(patientid).session(session);
     const doctor=await Doctor.findById(doctorid).session(session);
     if (!patient || !doctor) {
        throw new Error("Patient or Doctor not found");
      }
     const patientbalance=patient.wallet_balance;
     const doctorbalance=doctor.wallet_balance;
      const consultationfee=doctor.consultation_fee;
     if(patientbalance< consultationfee){
        throw new Error("Insufficient balance");
     }


     const existingtransaction= await Transaction.findOne({
        patient_id: patient._id,
        doctor_id: doctor._id,
     }).session(session);

     let discountedAmount = 0;
     let discountApplied = false;
     if(!existingtransaction){
        discountedAmount = 100;
        discountApplied=true;
     }
     const newpatientbalance=patientbalance-consultationfee+discountedAmount;
     const newdoctorbalance=doctorbalance+consultationfee;
    
     
     const transaction=new Transaction({
        patient_id: patient._id,
      patient_name: patient.name,
      patient_number:patient.number,
      doctor_id: doctor._id,
      doctor_name: doctor.name,
      consultation_fee: doctor.consultation_fee,
      discounted_amount: discountedAmount,
      discount_applied: discountApplied,
      doctor_balance: newdoctorbalance,
      patient_balance: newpatientbalance,

     });
     await transaction.save({session});

     patient.wallet_balance=newpatientbalance;
     await patient.save({session});
     doctor.wallet_balance=newdoctorbalance;
     await doctor.save({session});
   
     await session.commitTransaction();
     session.endSession();

     return   NextResponse.json({ ok: true, msg: "Transaction successful" });
   }catch(error:any){
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json({ ok: false, msg: error.message });
   }

}