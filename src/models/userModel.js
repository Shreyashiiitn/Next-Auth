import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String , 
        required : [true , "Please provide a username"] ,
        unique : true , 
    } , 
    email : {
        type: String , 
        required : [true , "Please provide a email"] ,
        unique : true , 
    } , 
    password :  {
        type: String , 
        required : [true , "Please provide a password"] ,
    } , 
    isVerified :  {
        type: Boolean ,  
        default : false , 
    } , 
    isAdmin : {
        type: Boolean ,  
        default : false , 
    } , 
    forgotPasswordToken : String , 
    forgotPasswordTokenExpriy : Date , 
    verifyToken : String , 
    verifyTokenExpiry : Date 

} , {timestamps : true}) 



// export const User = mongoose.model("User" , userSchema) , this is how we exported in the backend series 

const User = mongoose.models.User || mongoose.model("users" , userSchema)
export default User


// error while doing or definig schema 
// 🔥 Why You Got This Error
// Your schema (in the past) used usename instead of username.
// You set it as unique: true.
// So MongoDB created a unique index on usename.
// Now all new users have usename: null, and MongoDB thinks you're trying to add duplicate keys for null.
// 
// --> Fix for this {Drop the old wrong index from MongoDB}
// challenge faced 