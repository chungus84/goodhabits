import { login } from "../services/login.service.js";

export const userLogin = async (req, res) => {
    try {
        const user = await login(req.body)
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}
