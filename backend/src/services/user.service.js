import User from "../models/user.model.js";
class UserServices {
    findUserById = async (id) => {
        try {
            const res = await User.findById({ _id: id });
            return res;
        } catch (err) {
            throw err;
        }
    }
}

export default UserServices;
