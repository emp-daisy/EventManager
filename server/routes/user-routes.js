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

// GET USER VERIFIED
userRouter.get('/verify/:token', (req, res) => {
  new Users(req, res).verify();
});

// send verification link
userRouter.post('/users/verify/', (req, res) => {
  new Users(req, res).sendVerificationEmail(req.body.email);
});

// RESET A USERS PASSWORD - SEND TOKEN
userRouter.post('/users/reset', (req, res) => {
  new Users(req, res).sendReset();
});

// RESETTING A USERS PASSWORD
userRouter.post('/users/reset/:token', (req, res) => {
  new Users(req, res).reset();
});
export default userRouter;
