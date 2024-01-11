import ProfileServices from "../services/profile.service.js";
import { validationResult } from "express-validator";

const profileServices = new ProfileServices()

class ProfileControllers {
    getProfileByUserId = async (req, res) => {

        try {
            const profile = await profileServices.getProfileByUserId(req.headers.userid)
            res.status(200).json(profile)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    addNewUserProfile = async (req, res) => {
        try {
            const profile = await profileServices.addNewUserProfile(req.body);
            res.status(201).json(profile);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

export default ProfileControllers;
