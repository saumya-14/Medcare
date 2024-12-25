import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const { Schema } = mongoose;


const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number:{
   type:Number,
   unique:true,
   required:true
  },
  password: {
    type: String,
    required: true,
  },
  wallet_balance: {
    type: Number,
    default: 2000,
  },
}, { timestamps: true });


const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  consultation_fee: {
    type: Number,
    required: true,
  },
  wallet_balance: {
    type: Number,
    default: 1000,
  },
}, { timestamps: true }); 


const transactionSchema = new Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    patient_name: {
      type: String,
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    doctor_name: {
      type: String,
      required: true,
    },
    discount_applied: {
      type: Boolean,
      default: false,
    },
    discounted_amount: {
      type: Number,
      default: 0,
    },
    consultation_fee: {
      type: Number,
      required: true,
    },
    doctor_balance: {
      type: Number,
      required: true,
    },
    patient_balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
