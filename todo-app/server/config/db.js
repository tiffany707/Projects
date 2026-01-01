import mongoose from "mongoose";

export const connectDB = async () => {
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("success MONGO DB connected");
    }
    catch (error) {
        console.log(error)
    }
}