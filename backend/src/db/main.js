import mongoose from "mongoose";

const main = async () => {
    console.log(`Connecting to database at ${process.env.DBURI}`);
    try {
        await mongoose.connect(process.env.DBURI);
        console.log(`Connected to DB`);
    } catch (e) {
        console.log(`error with connecting to the db: ${e.message}`);
    }
}


export default main;
