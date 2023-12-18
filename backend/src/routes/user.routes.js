import express from 'express';

import UserControllers from '../controllers/user.controller.js';
export const router = express.Router();

const userControllers = new UserControllers();

router.get('/', userControllers.getUserById);
router.post('/', userControllers.addNewUser);
