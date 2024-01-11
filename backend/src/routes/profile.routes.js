import express from 'express';

import ProfileControllers from '../controllers/profile.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

export const router = express.Router();

const profileControllers = new ProfileControllers();

router.get('/', [verifyToken], profileControllers.getProfileByUserId);
router.post('/', profileControllers.addNewUserProfile);
