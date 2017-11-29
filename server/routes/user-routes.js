import express from 'express';
import Users from '../classes/users';

const userRouter = express.Router();

// CREATES A USER
userRouter.post('/users', (req, res) => {
  new Users(req, res).register();
});

// LOGIN A USER
userRouter.post('/users/login', (req, res) => {
  new Users(req, res).login();
});


export default userRouter;