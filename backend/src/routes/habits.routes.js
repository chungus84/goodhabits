import express from 'express';

import HabitControllers from '../controllers/habit.controller.js';

export const router = express.Router();

const habitControllers = new HabitControllers()

router.get('/', habitControllers.getAllHabits);
router.post('/', habitControllers.addHabit);
