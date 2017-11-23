import express from 'express';
import Events from '../classes/events';
import Centers from '../classes/centers';

const router = express.Router();

// GET AN EVENT
router.get('/events', (req, res, next) => {
  new Events(req, res, next).findAll();
});

// CREATES AN EVENT
router.post('/events', (req, res) => {
  new Events(req, res).create(req.body);
  console.log('EVENT created');
});

// EDIT AN EVENT
router.put('/events/:id', (req, res) => {
  new Events(req, res).put(req.params.id, req.body);
});

// DELETE AN EVENT
router.delete('/events/:id', (req, res, next) => {
  new Events(req, res, next).delete(req.params.id);
  console.log('Event deleted');
});

// ADD A NEW CENTER
router.post('/centers', (req, res, next) => {
  new Centers(req, res, next).create(req.body);
  console.log('Center created');
});

// GET ALL CENTERS
router.get('/centers', (req, res, next) => {
  new Centers(req, res, next).findAll();
  console.log('All center gotten');
});

// GET DETAILS OF A CENTER
router.get('/centers/:id', (req, res, next) => {
  new Centers(req, res, next).findOne(req.body);
  console.log('Center Gotten');
});

// MODIFIES DETAIS OF A CENTER
router.put('/centers/:id', (req, res, next) => {
  new Centers(req, res, next).put(req.params.id, req.body);
  console.log('Center modified');
});

// DELETE A CENTER
router.delete('/events/:id', (req, res, next) => {
  new Centers(req, res, next).delete(req.params.id);
  console.log('Center deleted');
});
export default router;
