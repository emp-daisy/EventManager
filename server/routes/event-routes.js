import express from 'express';
import Events from '../classes/events';

const eventRouter = express.Router();

// GET ALL EVENT
eventRouter.get('/events', (req, res) => {
  new Events(req, res).findAll();
});

// GET AN EVENT
eventRouter.get('/events/:id', (req, res) => {
  new Events(req, res).findOne(req.params.id);
});

// CREATES AN EVENT
eventRouter.post('/events', (req, res) => {
  new Events(req, res).create(req.body);
});

// EDIT AN EVENT
eventRouter.put('/events/:id', (req, res) => {
  new Events(req, res).put(req.params.id, req.body);
});

// DELETE AN EVENT
eventRouter.delete('/events/:id', (req, res) => {
  new Events(req, res).delete(req.params.id);
});

export default eventRouter;
