import { NextRequest } from "next/server";
import { connect } from "../dbConfig/db";

connect();

export const getdata = async (req: NextRequest) => {
  try {
    const body = await req.json();
    
    const id = body.userid;

    if (!id) {
      throw new Error("User ID not provided in the request body");
    }

    return id;
  } catch (error) {
    console.error("Error extracting user ID:", error);
    throw new Error("Error extracting user ID");
  }
};
