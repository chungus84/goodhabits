import express from 'express';

import EventControllers from '../controllers/event.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

export const router = express.Router();

const eventControllers = new EventControllers();
router.get('/:habitId', [verifyToken], eventControllers.getAllEvents);
router.post('/:habitId/add', [verifyToken], eventControllers.addEvent);
