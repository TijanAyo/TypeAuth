import mongoose from "mongoose";
import config from "config"
import logger from "./logger.utils";

async function connectDB() {
    const dbURI = config.get<string>('dbURI')

    try{
        await mongoose.connect(dbURI)
        logger.info('Connected to DB')
    }
    catch(e){
        process.exit(1)
    }
}

export default connectDB