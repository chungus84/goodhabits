import UserServices from "../services/user.service.js";

const userServices = new UserServices()

class UserControllers {
    getUserById = async (req, res) => {
        // console.log(req.headers.userid);
        try {
            const user = await userServices.findUserById(req.headers.userid)
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    addNewUser = async (req, res) => {
        try {
            const user = await userServices.addNewUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

export default UserControllers;
