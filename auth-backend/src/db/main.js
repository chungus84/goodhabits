import mongoose from "mongoose";

const main = async () => {
    console.log('Connecting to Auth DB @ mongodb:/127.0.0.1:27017/mydaysdevauth');
    try {
        console.log(process.env.DBURI);
        await mongoose.connect(`${process.env.DBURI}`);
        console.log('Connected to auth db');
    } catch (err) {
        console.log(`error connecting to DB ${err.message}`);
    }
}

export default main;
