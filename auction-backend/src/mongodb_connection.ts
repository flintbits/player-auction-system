import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()


let connection = mongoose.connect(String(process.env["MONGOOSE_URL"])).then(()=>{
    console.log("Database connection established")
})

export default connection