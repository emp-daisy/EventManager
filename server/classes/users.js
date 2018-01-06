import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from '../models';
import Validator from '../middleware/validator';

const userDb = model.Users;
const salt = bcrypt.genSaltSync(10);
/**
 *
/**
 *
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
        msg: 'Validation failed',
        errors: validationResponse
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
          .then(value =>
            this.res.status(201).json({
              val: value,
              msg: 'User added successfully'
            }))
          .catch(error => this.res.status(500).send(error));
      })
      .catc(error => this.res.status(500).send(error));
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
}
