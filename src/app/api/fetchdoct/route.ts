import { NextRequest, NextResponse } from "next/server";
import { Doctor } from "@/models/usermodel";
import { connect } from "@/dbConfig/db";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        await connect();
        const doctors = await Doctor.find().exec();
        return NextResponse.json(doctors, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ message: 'Error fetching doctors' }, { status: 500 });
    }
}
