import express from 'express';

import EventControllers from '../controllers/event.controller.js';

export const router = express.Router();

const eventControllers = new EventControllers();
router.get('/:habitId', eventControllers.getAllEvents);
router.post('/:habitId/add', eventControllers.addEvent);
