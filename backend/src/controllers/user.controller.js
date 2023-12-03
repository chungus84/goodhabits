import UserServices from "../services/user.service.js";

const userServices = new UserServices()

class UserControllers {
    getUserById = async (req, res) => {
        try {
            const user = await userServices.findUserById({ _id: "656c8236e394c45b13549677" })
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}
