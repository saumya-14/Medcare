import { NextRequest,NextResponse } from "next/server";
import { connect} from "@/dbConfig/db";
import { Transaction} from "@/models/usermodel";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export async function POST(req:NextRequest){
    try{
        const cookieHeader = req.headers.get("cookie") || ""; 
        const cookies = cookie.parse(cookieHeader); 
        const token = cookies.token || ""; 
        if(!token){
            return NextResponse.json({ message: "Token not provided" }, { status: 401 });
        }
        const data: any = jwt.verify(token, process.env.JWT_KEY!);
        const patientId = data.userid;
        if (!patientId) {
            return NextResponse.json({ message: "User ID not provided in the token" }, { status: 401 });
          }
        await connect();
        const {doctorId}=await req.json();
        const transaction=await Transaction.findOne({
            patient_id:patientId,
            doctor_id:doctorId,
        });
        return NextResponse.json({exists:!!transaction});
    }catch(error){
        console.log(error);
        return NextResponse.json({error},{status:500});
    }
}