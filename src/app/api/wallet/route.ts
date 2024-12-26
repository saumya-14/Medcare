import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { Patient } from "@/models/usermodel";
import { connect} from "@/dbConfig/db";
connect();
export async function GET(req: NextRequest){
    try{
         const cookieHeader = req.headers.get("cookie") || ""; // Default to empty string if no cookies are present
            const cookies = cookie.parse(cookieHeader); // Now safely parse the cookies
            const token = cookies.token || ""; // Get the token from cookies
        
            if (!token) {
              return NextResponse.json({ message: "Token not provided" }, { status: 401 });
            }
             const data: any = jwt.verify(token, process.env.JWT_KEY!);
            
                const id = data.userid;
                const patient = await Patient.findById(id);
                if (!patient) {
                    return NextResponse.json({ ok: false, msg: "User not found" }, { status: 404 });
                  }
           return NextResponse.json({ ok: true, wallet_balance: patient.wallet_balance });       
    }catch(error){
        console.log(error);
    }
}