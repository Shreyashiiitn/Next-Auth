import mongoose from "mongoose";  

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!) // "!" iska dene ka ye matlab hai ki 100% yaha string milegi hi milegi 
        const connection = mongoose.connection

        connection.on('connected' , ()=>{
            console.log('Mongo DB connected');
        })

        connection.on('error' , (error)=>{
            console.log('MONGO DB connection error , please make sure DB is up and runnning' + error);
            process.exit()
        })
    } catch (error) {
        console.log('Something went wrong in connectiong the DB');
        console.log(error);        
    }
}

export default connect