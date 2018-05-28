import express from 'express';
import
{
  register,
  login,
  removeUser,
  sendReset,
  reset,
  verify,
  resendVerification,
  makeAnAdmin
} from '../controllers/users';
import authenticationToken, { isAdmin } from '../middleware/auth';
import { validateUser, validateId } from '../middleware/validator';

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

// DELETE USER FROM DATABASE
userRouter.post('/users/role', authenticationToken, isAdmin, makeAnAdmin);

// MAKE USER NA ADMIN
userRouter.delete('/users/:id', authenticationToken, validateId, removeUser);

export default userRouter;
