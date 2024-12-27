import { NextResponse } from "next/server";
import { Doctor } from '@/models/usermodel';
import { connect } from '@/dbConfig/db';


connect();

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { name, specialization, consultation_fee } = await req.json();

  // Validate inputs
  if (!name || !specialization || !consultation_fee) {
    return NextResponse.json({ message: 'All fields are required: name, specialization, and consultation fee' }, { status: 400 });
  }

  try {
    await connect(); // Ensure the database is connected

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      specialization,
      consultation_fee,
    });

    await newDoctor.save();

    return NextResponse.json({ message: 'Doctor created successfully', doctor: newDoctor }, { status: 201 });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
