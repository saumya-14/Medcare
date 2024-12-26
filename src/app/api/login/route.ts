import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import { Patient } from "@/models/usermodel";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";

connect();

export async function POST(req:NextRequest){
    try{
        const {number,password}=await req.json();

        const user = await Patient.findOne({number:number  });

        if (!user) {
          return NextResponse.json({ msg: 'User does not exist', ok: false });
        }
        const check=await bcrypt.compare(password,user.password);
        if(!check){
            return NextResponse.json({ msg: 'Incorrect password', ok: false });
        }
        const token = Jwt.sign({ userid: user._id }, process.env.JWT_KEY!);
        const res = NextResponse.json({ msg: 'User login', user, ok: true });
        res.cookies.set('token', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60, 
          path: '/',
        });
        return res;
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ msg: 'Error logging in user', error, ok: false });
}
}