// /src/app/api/token/route.ts

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";  // Updated import

// Export a named handler for GET requests
export async function GET(request: Request) {
  try {
    // Parse cookies from the request header
    const cookieHeader = request.headers.get("cookie") || ""; // Default to empty string if no cookies are present
    const cookies = cookie.parse(cookieHeader); // Now safely parse the cookies
    const token = cookies.token || ""; // Get the token from cookies

    if (!token) {
      return NextResponse.json({ message: "Token not provided" }, { status: 401 });
    }

    // Verify the JWT token
    const data: any = jwt.verify(token, process.env.JWT_KEY!);

    const id = data.userid;

    if (!id) {
      return NextResponse.json({ message: "User ID not provided in the token" }, { status: 401 });
    }

    return NextResponse.json({ message: "Token is valid", isLoggedIn: true });

  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
