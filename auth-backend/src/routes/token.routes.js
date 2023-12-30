import express from 'express';

import { refreshToken, deleteToken } from '../controllers/token.controller.js';

export const router = express.Router()
router.post('/', refreshToken);
router.delete('/', deleteToken);
