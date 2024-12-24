import { NextRequest,NextResponse } from "next/server";
import { Doctor } from "@/models/usermodel";
import { connect } from "@/dbConfig/db";


export async function GET(req:NextRequest,res:NextResponse) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowed' });
      }
      try{
           await connect();
           const doctor = await Doctor.find().exec();
           return NextResponse.json(doctor);

      }catch(error:any){
        console.log('Error fetching doctors:', error);
        return NextResponse.json({ message: 'Error fetching doctors' });

      }
}