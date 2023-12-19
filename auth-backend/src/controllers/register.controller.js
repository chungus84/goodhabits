import { addUser } from "../services/register.service.js"

export const registerNewUser = async (req, res) => {
    try {
        const user = await addUser(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}
