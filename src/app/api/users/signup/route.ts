import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        // ❌ Never call await connect() at the top-level in an API route file
        await connect() // need to be keep in mind , should be await 

        const reqBody = await request.json() // this is a promise and it requires a time , await hona chaiye since promise hai 
        const { username, email, password } = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 }) // logic fix: if user exists, return error
        }

        // encrypt the password from the bcryptjs 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt) // no need for callback in async/await

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // now we have to send the verification email 
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        // now sedn the response 
        return NextResponse.json({
            message: "User registered succesfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// localhost:3000/api/users/signup
