import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Patient } from "@/models/usermodel";
import { connect } from "@/dbConfig/db";

// Ensure database connection
connect();

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const { name, number, password } = await req.json();

    // Validate input
    if (!name || !number || !password) {
      return NextResponse.json(
        { message: "All fields are required: name, number, and password" },
        { status: 400 }
      );
    }

    // Check if the number already exists
    const existingPatient = await Patient.findOne({ number });
    if (existingPatient) {
      return NextResponse.json(
        { message: "Patient with this number already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient
    const newPatient = new Patient({
      name,
      number,
      password: hashedPassword,
      wallet_balance: 2000,
    });

    await newPatient.save();

    // Generate JWT token
    const token = jwt.sign(
      { userid: newPatient._id },
      process.env.JWT_KEY || "default_secret_key", // Use a fallback key
      { expiresIn: "24h" }
    );

    // Set HTTP-only cookie with JWT
    const response = NextResponse.json(
      {
        message: "Patient created successfully",
        patient: {
          id: newPatient._id,
          name: newPatient.name,
          number: newPatient.number,
          wallet_balance: newPatient.wallet_balance,
        },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
