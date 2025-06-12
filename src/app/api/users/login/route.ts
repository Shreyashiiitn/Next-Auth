import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcrypt from "bcryptjs";
import { validateHeaderName } from "http";
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"

 
export async function POST(request : NextRequest) {
    try {
        await connect() ; 
        const reqBody = await request.json() 
        const {email, password } = reqBody
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "User does not exist"}, { status: 500 })
        }
        console.log("User exist");

        // now password should be checked , done by bcrypt js 
        const vaildpassword = await bcrypt.compare(password , user.password) 
        // return true or false

        if(!vaildpassword){
            return NextResponse.json({ error: "Check you password again" }, { status: 400 })
        }

        // if user password is correct , we need jwt token now 
        const tokenData = {
            id : user._id , 
            username: user.username , 
            email : user.email , 
        }

        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn : '1d'})
        // user ko token diya hai , aur uss token me data hai 

        const response = NextResponse.json({
            message : "Logged in sucess" , 
            success : true ,
        })

        response.cookies.set("token" , token , {httpOnly : true})
        return response ; 
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}