import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

export const sendEmail = async({email , emailType , userId} : any) => {
    try {
        
        const hashedToken = await bcrypt.hash(userId.toString() , 10) // iska koi need tha nahi , 
        // better options can be UUID , isme special char nahi rehta hai , 

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId , 
                {
                    verifyToken : hashedToken , 
                    verifyTokenExpiry : Date.now() + 3600000 // expiry in 1 hour from now 
                })

                // if error gives lets set this in mongo $set : 
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId , 
                {
                    forgotPasswordToken : hashedToken , 
                    forgotPasswordTokenExpiry : Date.now() + 3600000
                })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "6e117c5cc1218e",  // here it shoudl be in the .env file , this is for sure 
            pass: "b3e88c7b919cb5"
            }
        });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;
    } catch (error : any) { // type of error can be any
        throw new Error(error.message)
    }
}