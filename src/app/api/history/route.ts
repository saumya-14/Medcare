import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import { Transaction } from "@/models/usermodel";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
connect();

export async function GET(req:NextRequest) {
    try {
        
        const cookieHeader = req.headers.get("cookie") || ""; 
        const cookies = cookie.parse(cookieHeader); 
        const token = cookies.token || ""; 
    
        if (!token) {
          return NextResponse.json({ ok: false, msg: "Token not provided" }, { status: 401 });
        }
    
      
        const data: any = jwt.verify(token, process.env.JWT_KEY!);
        const patientId = data.userid;
    
        if (!patientId) {
          return NextResponse.json({ ok: false, msg: "Invalid token payload" }, { status: 401 });
        }
    

        const transactions = await Transaction.find({ patient_id: patientId });
    
        if (!transactions || transactions.length === 0) {
          return NextResponse.json({ ok: false, msg: "No transactions found" }, { status: 404 });
        }
    
        return NextResponse.json({ ok: true, transactions }, { status: 200 });
      } catch (error: any) {
        console.error("Error fetching transactions:", error.message);
        return NextResponse.json(
          { ok: false, msg: "An error occurred while fetching transactions" },
          { status: 500 }
        );
      }
    }