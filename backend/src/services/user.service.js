import User from "../models/user.model.js";
import mongoose from 'mongoose';

class UserServices {
    findUserById = async (id) => {
        try {
            // console.log(id.userId);
            const objId = new mongoose.Types.ObjectId(id.userId)
            // console.log(objId);
            const res = await User.findOne({ userId: objId });
            // console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    }

    addNewUser = async (user) => {

        try {
            const res = await User.create(user);
            return res;
        } catch (err) {
            throw err;
        }
    }
}

export default UserServices;
