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