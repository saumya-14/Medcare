import { NextResponse } from "next/server"; 
import bcrypt from 'bcryptjs'; 
import { Patient } from '@/models/usermodel';
import { connect } from '@/dbConfig/db';


connect();

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { name, password } = await req.json();  

  if (!name || !password) {
    return NextResponse.json({ message: 'All fields are required: name and password' }, { status: 400 });
  }

  try {
    await connect();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      name,
      password: hashedPassword,
      wallet_balance: 2000, 
    });

    await newPatient.save();

    return NextResponse.json({ message: 'Patient created successfully', patient: newPatient }, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
