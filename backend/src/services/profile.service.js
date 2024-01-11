import Profile from "../models/profile.model.js";
import mongoose from 'mongoose';

class ProfileServices {
    findProfileByUserId = async (userId) => {
        console.log(userId);
        try {
            const objId = new mongoose.Types.ObjectId(userId)
            const res = await Profile.findOne({ userId: objId });
            return res;
        } catch (err) {
            throw err;
        }
    }

    addNewUserProfile = async (userProfile) => {

        try {
            const res = await Profile.create(userProfile);
            console.log(res);
            return res;
        } catch (err) {
            throw err;
        }
    }
}

export default ProfileServices;
