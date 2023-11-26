import express from 'express';

import EventControllers from '../controllers/event.controller.js';

export const router = express.Router();

const eventControllers = new EventControllers();
router.get('/', eventControllers.getAllEvents);
router.post('/', eventControllers.addEvent);
