import User from "../models/user.model.js";
import mongoose from 'mongoose';

class UserServices {
    findUserById = async (userId) => {
        // console.log(userId);
        try {
            const objId = new mongoose.Types.ObjectId(userId)
            const res = await User.findOne({ userId: objId });
            return res;
        } catch (err) {
            throw err;
        }
    }

    addNewUser = async (user) => {

        try {
            const res = await User.create(user);
            console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    }
}

export default UserServices;
