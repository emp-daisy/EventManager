/**
 * User route controller
 */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sequelize from 'sequelize';
import model from '../models';
import sendEmail from '../middleware/email';


const userDb = model.Users;
const salt = bcrypt.genSaltSync(10);
/**
 * Verify token
 * @param {string} token
 * @returns {string} user ID
 */
const validateToken = (token) => {
  let userId;
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      userId = null;
    } else {
      userId = user.id;
    }
  });
  return userId;
};
/**
 * Send verification email to user
 * @param {string} email user email
 * @param {callback} done
 * @returns {Object} JSON response
 */
const sendVerificationEmail = email => userDb
  .findOne({
    where: {
      email,
      verify: {
        [sequelize.Op.not]: null
      }
    }
  })
  .then((value) => {
    const token = jwt.sign(
      {
        id: value.id
      },
      process.env.SECRET_KEY, {
        expiresIn: '15m'
      }
    );
    userDb
      .update({
        verify: token
      }, {
        where: {
          id: value.id
        }
      })
      .then(() => {
        const verifyLink = `${(process.env.VERIFY_URL || 'http://localhost:3088/v1/verify')}/${token}`;

        sendEmail('noreply@daisy.io', value.email, 'Account Verification', `Welcome ${value.firstName},
      
              Please use this link below to verify account. Expires in 15 minutes.
              ${verifyLink}
              
              sincerly,
              Admin Team`);
      });
  });
/**
 * Register new user
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const register = (req, res) => {
  const data = req.body;
  return userDb
    .findOne({
      where: {
        email: data.email
      }
    })
    .then((result) => {
      if (result) {
        return res.status(400).json({
          msg: 'User email exists'
        });
      }
      userDb
        .create({
          firstName: data.firstName,
          surname: data.surname,
          email: data.email,
          password: bcrypt.hashSync(data.password, salt)
        })
        .then((value) => {
          sendVerificationEmail(value.email);
          return res.status(201).json({
            msg: 'User added successfully. Check email to verify'
          });
        });
    })
    .catch(error => res.status(500).send(error));
};
/**
 * Login user
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const login = (req, res) => {
  const data = req.body;
  return userDb
    .findOne({
      where: { email: data.email }
    })
    .then((result) => {
      if (result === null) {
        return res.status(404).json({ msg: 'User not found' });
      } else if (result.verify !== null) {
        return res.status(400).json({ unverified: true, msg: 'Account unverified' });
      } else if (!bcrypt.compareSync(data.password, result.password)) {
        return res.status(400).json({ msg: 'Invalid Username or Password' });
      }
      res.status(200).json({
        token: jwt.sign(
          {
            id: result.id,
            isAdmin: result.isAdmin
          },
          process.env.SECRET_KEY, {
            expiresIn: '2d'
          }
        ),
        msg: 'login successful'
      });
    })
    .catch(error => res.status(500).send(error));
};
/**
 * Delete user
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const removeUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tokenId = parseInt(req.verified.id, 10);

  if (id !== tokenId && req.verified.isAdmin === false) {
    return res.status(401).json({ msg: 'Unauthorized user' });
  }
  return userDb
    .findOne({
      where: { id }
    })
    .then((result) => {
      if (result === null) {
        return res.status(400).json({
          msg: 'User not found'
        });
      }
      return userDb
        .destroy({
          where: { id }
        })
        .then(() => res.status(200).json({ msg: 'User deleted' }));
    })
    .catch(error => res.status(500).send(error));
};
/**
 * Send email for password reset
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const sendReset = (req, res) => {
  const data = req.body;
  return userDb
    .findOne({
      where: { email: data.email }
    })
    .then((result) => {
      if (result === null) { return res.status(404).json({ msg: 'User not found' }); }
      const token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, { expiresIn: '15m' });
      const resetLink = `${req.protocol}://${req.headers.host}/reset/${token}`;
      sendEmail('noreply@daisy.io', result.email, 'Password Reset', `Hello ${result.firstName},
          
      You have requested for a password reset.
      Use this link below to change your passsword. Expires in 15 minutes.
      ${resetLink}
      NOTE: If you did not request this please ignore.
      
      sincerly,
      Admin Team`);
      res.status(200).json({ msg: 'An email has been sent to the requested email address.' });
    })
    .catch(error => res.status(500).send(error));
};
/**
 * Reset password
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const reset = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const userId = validateToken(token);
  if (userId === null) {
    return res.status(403).json({
      msg: 'Invalid link'
    });
  }
  return userDb
    .update({
      password: bcrypt.hashSync(password, salt)
    }, {
      where: {
        id: userId
      }
    })
    .then((result) => {
      if (result > 0) {
        return res.status(200).json({ msg: 'Password reset successful' });
      }
      res.status(404).json({ msg: 'User not found' });
    })
    .catch(error => res.status(500).send(error));
};
/**
 * Verify new account
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const verify = (req, res) => {
  const {
    token
  } = req.params;
  const userId = validateToken(token);
  if (userId === null) {
    return res.status(403).json({
      msg: 'Invalid link'
    });
  }

  return userDb
    .update({
      verify: null
    }, {
      where: {
        id: userId,
        verify: token
      }
    })
    .then((result) => {
      if (result > 0) {
        return res.status(200).send('Account verified successful');
      }
      res.status(404).send('Account not found or already verified');
    })
    .catch(error => res.status(500).send(error));
};

/**
 * Resend verification email
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const resendVerification = (req, res) => {
  const {
    email
  } = req.body;
  sendVerificationEmail(email).then(() => {
    res.status(200).json({
      msg: 'Link sent to email'
    });
  });
};

export {
  register,
  login,
  removeUser,
  sendReset,
  reset,
  verify,
  resendVerification
};
