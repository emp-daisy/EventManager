import express from 'express';
import Centers from '../classes/centers';
import authenticationToken from '../middleware/auth';

const centerRouter = express.Router();

// GET ALL CENTERS
centerRouter.get('/centers', (req, res) => {
  new Centers(req, res).findAllCenter();
});

// GET DETAILS OF A CENTER
centerRouter.get('/centers/:id', (req, res) => {
  new Centers(req, res).findOneCenter();
});

// ADD A NEW CENTER
centerRouter.post('/centers', authenticationToken, (req, res) => {
  new Centers(req, res).createCenter();
});

// MODIFIES DETAIS OF A CENTER
centerRouter.put('/centers/:id', authenticationToken, (req, res) => {
  new Centers(req, res).updateCenter();
});

// DELETE A CENTER
centerRouter.delete('/centers/:id', authenticationToken, (req, res) => {
  new Centers(req, res).deleteCenter();
});

export default centerRouter;