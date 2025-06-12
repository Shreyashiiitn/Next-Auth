import connect from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcrypt from "bcryptjs";
import { validateHeaderName } from "http";
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"
import getDataFromToken from "@/helpers/getDatafromToken";


export async function POST(request : NextRequest){
    try {
        await connect() ; 
        // extract data from token // lets make utility for this things 
        const userId = await getDataFromToken(request)
        const user = User.findOne({_id : userId}).select("-password")

        // check if there is no user 
        if(!user){
            
        }
        return NextResponse.json({
            message: "User found" , 
            data : user
        })


    } catch (error) {
        
    }
}