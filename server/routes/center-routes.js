import express from 'express';
import Centers from '../classes/centers';

const centerRouter = express.Router();

// GET ALL CENTERS
centerRouter.get('/centers', (req, res) => {
  new Centers(req, res).findAll();
});

// GET DETAILS OF A CENTER
centerRouter.get('/centers/:id', (req, res) => {
  new Centers(req, res).findOne(req.params.id);
});

// ADD A NEW CENTER
centerRouter.post('/centers', (req, res) => {
  new Centers(req, res).create(req.body);
});

// MODIFIES DETAIS OF A CENTER
centerRouter.put('/centers/:id', (req, res) => {
  new Centers(req, res).put(req.params.id, req.body);
});

// DELETE A CENTER
centerRouter.delete('/centers/:id', (req, res) => {
  new Centers(req, res).delete(req.params.id);
});

export default centerRouter;