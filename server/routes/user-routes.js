import express from 'express';
import
{
  register,
  login,
  sendReset,
  reset,
  verify,
  resendVerification
} from '../controllers/users';
import { validateUser } from '../middleware/validator';

const userRouter = express.Router();

// CREATES A USER
userRouter.post('/users', validateUser, register);

// LOGIN A USER
userRouter.post('/users/login', login);

// GET USER VERIFIED
userRouter.get('/verify/:token', verify);

// send verification link
userRouter.post('/users/verify', resendVerification);

// RESETTING A USERS PASSWORD
userRouter.post('/users/reset/:token', reset);

// RESET A USERS PASSWORD - SEND TOKEN
userRouter.post('/users/reset', sendReset);


export default userRouter;
