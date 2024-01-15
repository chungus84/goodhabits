import express from 'express';

import HabitControllers from '../controllers/habit.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

export const router = express.Router();

const habitControllers = new HabitControllers()

router.post('/', [verifyToken], habitControllers.addHabit);
