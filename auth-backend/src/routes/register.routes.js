import express from 'express';

export const router = express.Router();

import AuthUser from '../model/authUser.model.js';
import { registerNewUser } from '../controllers/register.controller.js';

router.post('/', registerNewUser)
