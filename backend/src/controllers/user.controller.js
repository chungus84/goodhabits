import UserServices from "../services/user.service.js";

const userServices = new UserServices()

class UserControllers {
    getUserById = async (req, res) => {
        req = {
            body: "656c8236e394c45b13549677"
        }
        try {
            const user = await userServices.findUserById(req.body)
            console.log(user);
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

export default UserControllers;
