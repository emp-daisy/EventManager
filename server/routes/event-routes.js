import express from 'express';
import Events from '../classes/events';
import authenticationToken from '../middleware/auth';

const eventRouter = express.Router();

// GET ALL EVENT
eventRouter.get('/events', (req, res) => {
  new Events(req, res).findAllEvent();
});

// GET AN EVENT
eventRouter.get('/events/:id', (req, res) => {
  new Events(req, res).findOneEvent();
});

// CREATES AN EVENT
eventRouter.post('/events', authenticationToken, (req, res) => {
  new Events(req, res).createEvent();
});

// EDIT AN EVENT
eventRouter.put('/events/:id', authenticationToken, (req, res) => {
  new Events(req, res).updateEvent();
});

// DELETE AN EVENT
eventRouter.delete('/events/:id', authenticationToken, (req, res) => {
  new Events(req, res).deleteEvent();
});

export default eventRouter;