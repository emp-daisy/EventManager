import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sequelize from 'sequelize';
import model from '../models';
import Validator from '../middleware/validator';
import sendEmail from '../middleware/email';

const userDb = model.Users;
const salt = bcrypt.genSaltSync(10);
/**
 *
 * @export
 * @class Users
 */
export default class Users {
  /**
   * Creates an instance of Users.
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  /**
   * Registrs a new user
   *
   * @returns {Object} JSON response
   * @memberof Users
   */
  register() {
    const data = this.req.body;
    const validationResponse = Validator.validateUser(data);
    if (validationResponse !== true) {
      return this.res.status(400).json({
        msg: validationResponse
      });
    }
    return userDb
      .findOne({
        where: {
          email: data.email
        }
      })
      .then((result) => {
        if (result) {
          return this.res.status(400).json({
            msg: 'User exists'
          });
        } else if (data.password !== data.confirmPassword) {
          return this.res.status(400).json({
            msg: 'Password does not match'
          });
        }
        userDb
          .create({
            firstName: data.firstName,
            surname: data.surname,
            email: data.email,
            password: bcrypt.hashSync(data.password, salt),
            isAdmin: data.isAdmin
          })
          .then((value) => {
            sendVerificationEmail(value.email);

            return this.res.status(201).json({
              msg: 'User added successfully. Check email to verify'
            });
          })

          .catch(error => this.res.status(500).send(error));
      })
      .catch(error => this.res.status(500).send(error));
  }
  /**
   * Login an existing user
   *
   * @returns {Object} JSON response
   * @memberof Users
   */
  login() {
    const data = this.req.body;
    return userDb
      .findOne({
        where: {
          email: data.email
        }
      })
      .then((result) => {
        if (result === null) {
          return this.res.status(404).json({
            msg: 'User not found'
          });
        } else if (result.verify !== null) {
          return this.res.status(400).json({
            unverified: true,
            msg: 'Account unverified'
          });
        } else if (!bcrypt.compareSync(data.password, result.password)) {
          return this.res.status(400).json({
            msg: 'Invalid Username or Password'
          });
        }

        this.res.status(200).json({
          token: jwt.sign(
            {
              id: result.id,
              isAdmin: result.isAdmin
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '2d'
            }
          ),
          msg: 'login successful'
        });
      })
      .catch(error => this.res.status(500).send(error));
  }
  /**
   * Send URL for password reset
   *
   * @returns {Object} JSON response
   * @memberof Users
   */
  sendReset() {
    const data = this.req.body;
    return userDb
      .findOne({
        where: {
          email: data.email
        }
      })
      .then((result) => {
        if (result === null) {
          return this.res.status(404).json({
            msg: 'User not found'
          });
        }
        const token = jwt.sign(
          {
            id: result.id
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '15m'
          }
        );

        const resetLink = `${(process.env.RESET_URL || 'http://localhost:3088/reset')}/${token}`;

        sendEmail('noreply@daisy.io', result.email, 'Password Reset', `Hello ${result.firstName},
            
        You have requested for a password reset.
        Use this link below to change your passsword. Expires in 15 minutes.
        ${resetLink}
        NOTE: If you did not request this please ignore.
        
        sincerly,
        Admin Team`);

        this.res.status(200).json({
          msg: 'An email has been sent to the requested email address.'
        });
      })
      .catch(error => this.res.status(500).send(error));
  }
  /**
   * Reset password with token
   *
   * @returns {Object} JSON response
   * @memberof Users
   */
  reset() {
    const { token } = this.req.params;
    const { password } = this.req.body;
    let userId = '';
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return this.res.status(403).json({
            msg: 'Invalid or expired link'
          });
        }
        userId = user.id;
      });
    } else {
      return this.res.status(403).json({
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
          return this.res.status(200).json({
            msg: 'Password reset successful'
          });
        }
        this.res.status(404).json({
          msg: 'User not found'
        });
      })
      .catch(error => this.res.status(500).send(error));
  }
  /**
   * Verify user account with token
   *
   * @returns {Object} JSON response
   * @memberof Users
   */
  verify() {
    const { token } = this.req.params;
    let userId = '';
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return this.res.status(403).send('Invalid or expired link');
        }
        userId = user.id;
      });
    } else {
      return this.res.status(403).send('Invalid link');
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
          return this.res.status(200).send('Account verified successful');
        }
        this.res.status(404).send('Account not found or already verified');
      })
      .catch(error => this.res.status(500).send(error));
  }
}

/**
   * Send verification emailto user
   *
   * @param {string} email user email
   * @returns {Object} JSON response
   */
const sendVerificationEmail = (email) => {
  userDb
    .findOne({
      where: {
        email,
        verify: { [sequelize.Op.not]: null }
      }
    })
    .then((value) => {
      const token = jwt.sign(
        {
          id: value.id
        },
        process.env.SECRET_KEY,
        {
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
        .then((resp) => {
          if (resp > 0) {
            // return this.res.status(200).send('Registration failed');
          }
          const verifyLink = `${(process.env.VERIFY_URL || 'http://localhost:3088/v1/verify')}/${token}`;

          sendEmail('noreply@daisy.io', value.email, 'Account Verification', `Welcome ${value.firstName},
      
              Please use this link below to verify account. Expires in 15 minutes.
              ${verifyLink}
              
              sincerly,
              Admin Team`);
        });
    });
};
