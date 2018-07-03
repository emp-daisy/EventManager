import express from 'express';
import {
  findAllCenter,
  findOneCenter,
  createCenter,
  preUpdate,
  updateCenter,
  deleteCenter,
  getStates
} from '../controllers/centers';
import authenticationToken, { isAdmin } from '../middleware/auth';
import { validateCenter, validateId } from '../middleware/validator';

const centerRouter = express.Router();

// GET ALL CENTERS
centerRouter.get('/centers', findAllCenter);

// GET DETAILS OF A CENTER
centerRouter.get('/centers/:id', validateId, findOneCenter);

// ADD A NEW CENTER
centerRouter.post('/centers', authenticationToken, isAdmin, validateCenter, createCenter);

// MODIFIES DETAIS OF A CENTER
centerRouter.put('/centers/:id', authenticationToken, isAdmin, validateId, preUpdate, validateCenter, updateCenter);

// DELETE A CENTER
centerRouter.delete('/centers/:id', authenticationToken, isAdmin, validateId, deleteCenter);

// GET ALL STATES
centerRouter.get('/states', getStates);

export default centerRouter;
