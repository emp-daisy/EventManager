import express from 'express';
import {
  findAllEvent,
  findOneEvent,
  createEvent,
  findEventByCenter,
  updateEvent,
  preUpdate,
  deleteEvent
} from '../controllers/events';
import authenticationToken from '../middleware/auth';
import { validateEvent,
  validateId } from '../middleware/validator';

const eventRouter = express.Router();

// GET ALL EVENT FOR A USER
eventRouter.get('/events', authenticationToken, findAllEvent);

// GET AN EVENT
eventRouter.get('/events/:id', validateId, findOneEvent);

// SEARCH FOR EVENTS BY  CENTER ID
eventRouter.get('/events/center/:id', validateId, findEventByCenter);

// CREATES AN EVENT
eventRouter.post('/events', authenticationToken, validateEvent, createEvent);

// EDIT AN EVENT
eventRouter.put('/events/:id', authenticationToken, validateId, preUpdate, validateEvent, updateEvent);

// DELETE AN EVENT
eventRouter.delete('/events/:id', authenticationToken, validateId, deleteEvent);

export default eventRouter;
