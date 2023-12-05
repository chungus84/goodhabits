import express from 'express';

import { userLogin } from '../controllers/userLogin.controller.js';

export const router = express();

router.post('/', userLogin)
