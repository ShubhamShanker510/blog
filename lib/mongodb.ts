import mongoose from 'mongoose'

const MONGO_URI=process.env.MONGO_URI as string;

if(!MONGO_URI){
    throw new Error("Please defne the MONGO_URI enviroment variable")
}

let isConnected =false;

const connectDb=async()=>{
    if(isConnected){
        console.log("Using exisitng database connection");
        return;
    }

    try {

        const db=await mongoose.connect(MONGO_URI);
        isConnected=true;
        console.log("Connected to MongoDb")


    } catch (error) {
        console.log("Database connection failed", error);
        throw new Error("Failed to connect to MongoDB")
    }
}

export default connectDb;