import User from "../models/user.model.js";
class UserServices {
    findUserById = async (id) => {
        try {
            // console.log(id);
            const res = await User.findById({ _id: "656c8236e394c45b13549677" });
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
