import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from '../models';
import Validator from '../middleware/validator';

const userDb = model.Users;
const salt = bcrypt.genSaltSync(10);
/**
 *
 */
export default class Users {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

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
            password: bcrypt.hashSync(data.password, salt)
          })
          .then(value => this.res.status(201).json({
            val: value,
            msg: 'User added successfully'
          }))
          .catch(error => this.res.status(500).send(error));
      })
      .catch(error => this.res.status(500).send(error));
  }

  login() {
    const data = this.req.body;
    return userDb
      .findOne({
        where: {
          email: data.email
        }
      })
      .then((result) => {
        if (!result) {
          return this.res.status(401).json({
            msg: 'User not found'
          });
        } else if (!bcrypt.compareSync(data.password, result.password)) {
          return this.res.status(401).json({
            msg: 'Username or password does not match'
          });
        }

        this.res.status(200).json({
          token: jwt.sign({
            id: result.id,
            isAdmin: result.isAdmin,
          }, process.env.SECRET_KEY, {
            expiresIn: '24h'
          }),
          msg: 'login successful'
        });
      })
      .catch(error => this.res.status(500).send(error));
  }

}