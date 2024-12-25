import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getdata = (request: NextRequest) => {
  try {
   
    const token = request.cookies.get("token")?.value || "";

   
    if (!token) {
      throw new Error("Token not provided");
    }

  
    const data: any = jwt.verify(token, process.env.JWT_KEY!);

    const id = data.userid;

    
    if (!id) {
      throw new Error("User ID not provided in the token");
    }

    return { id, token };
  } catch (error: any) {
  
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT Error:", error);
      throw new Error("Invalid or expired token");
    }

    console.error("Error extracting user ID:", error);
    throw new Error("Error extracting user ID");
  }
};
