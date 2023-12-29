import express from 'express';

import HabitControllers from '../controllers/habit.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

export const router = express.Router();

const habitControllers = new HabitControllers()

router.get('/', [verifyToken], habitControllers.getAllHabits);
router.post('/', habitControllers.addHabit);
