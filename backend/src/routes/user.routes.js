import express from 'express';

import UserControllers from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

export const router = express.Router();

const userControllers = new UserControllers();

router.get('/', [verifyToken], userControllers.getUserById);
router.post('/', userControllers.addNewUser);
