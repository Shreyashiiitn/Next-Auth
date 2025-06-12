import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request : NextRequest) {
    try {
        await connect()
        const reqBody = await request.json() ; 
        const {token}  = reqBody ; 
        console.log(token); // to verify the token is coming or not 
        
        const user = await User.findOne({verifyToken : token , verifyTokenExpiry : {$gt : Date.now()}})
        // token date should be greater than now then only it will come ,
        // both cond should match then we get user 

        if(!user){
            return NextResponse.json({error: "invalid token details"} , {status : 500})
        }
        console.log(user); //  see here user came or not 
        
        // no isverified should be true , also remove verifyTokemn  , expriy from the databse 
        user.isVerified = true ; 
        user.verifyToken = undefined ; 
        user.verifyTokenExpiry = undefined ;

        await user.save() // database differenct continent me hai 

        return NextResponse.json({
            message : "Email verified succesfully" , 
            success : true 
        } , {status : 200})

        

    } catch (error  : any) { // give type of error always 
        return NextResponse.json({error: error.message} , {status : 500})
    }
}