import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export const getdata = (req: NextRequest) => {
  try {
   
     const cookieHeader = req.headers.get("cookie") || ""; 
            const cookies = cookie.parse(cookieHeader); 
            const token = cookies.token || ""; 
            if(!token){
                return NextResponse.json({ message: "Token not provided" }, { status: 401 });
            }
            const data: any = jwt.verify(token, process.env.JWT_KEY!);
            const patientId = data.userid;

    return { patientId };
  } catch (error: any) {
  
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT Error:", error);
      throw new Error("Invalid or expired token");
    }

    console.error("Error extracting user ID:", error);
    throw new Error("Error extracting user ID");
  }
};
