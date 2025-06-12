import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from "@/helpers/mailer";

export async function GET(request: NextRequest){
    try {
        await connect() ; 
        const response = NextResponse.json({
            message : "Logout sucessfully" , 
            success : true
        })

        response.cookies.set("token" , "" , {
            httpOnly  : true , 
            expires : new Date(0)
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}