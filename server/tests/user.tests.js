import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import app from '../app';
import model from '../models';

const {
  expect
} = chai;
chai.use(chaiHttp);
const user = {},
  adminUser = {};
let regToken = '';
let adminToken = '';
let nonAdminToken = '';
const resetToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTI3MDIzODYyfQ.ox6b8Hs-3GszsCPrfrF0KOSu3IaJwszIOhE6fUGZKQg';

describe('User API Testing', () => {
  before(() => {
    user.email = faker.internet.email();

    adminUser.email = faker.internet.email();
  });

  describe('Valid User URL', () => {
    describe('Registration', () => {
      it('Returns newly created user object and 201 status code', (done) => {
        chai
          .request(app)
          .post('/v1/users')
          .send({
            firstName: faker
              .name
              .firstName(),
            surname: faker
              .name
              .lastName(),
            email: user.email,
            password: 'TESTpwd',
            confirmPassword: 'TESTpwd'
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(201);
            expect(res.body.msg)
              .to
              .equal('User added successfully. Check email to verify');
            done();
          });
      });
      it('Returns newly created admin user object and 201 status code', (done) => {
        chai
          .request(app)
          .post('/v1/users')
          .send({
            firstName: faker
              .name
              .firstName(),
            surname: faker
              .name
              .lastName(),
            email: adminUser.email,
            password: 'TESTpwd',
            confirmPassword: 'TESTpwd',
            isAdmin: true
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(201);
            expect(res.body.msg)
              .to
              .equal('User added successfully. Check email to verify');
            done();
          });
      });
      it('Returns an error message for missing password and 400 status code', (done) => {
        chai
          .request(app)
          .post('/v1/users')
          .send({
            firstName: faker
              .name
              .firstName(),
            surname: faker
              .name
              .lastName(),
            email: user.email,
            password: 'TESTpwd',
            isAdmin: faker
              .random
              .boolean()
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .be
              .an('object');
            done();
          });
      });
      it('Returns an error message since the user exists and 400 status code', (done) => {
        chai
          .request(app)
          .post('/v1/users')
          .send({
            firstName: faker
              .name
              .firstName(),
            surname: faker
              .name
              .lastName(),
            email: user.email,
            password: 'TESTpwd',
            confirmPassword: 'TESTpwd',
            isAdmin: faker
              .random
              .boolean()
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .equal('User email exists');
            done();
          });
      });
      after((done) => {
        model.Users.findOne({
          where: {
            email: user.email
          }
        }).then((res) => {
          regToken = res.verify;
          done();
        });
      });
    });

    describe('Login Unverified user', () => {
      it('Returns error messgae for unverified users', (done) => {
        chai
          .request(app)
          .post('/v1/users/login')
          .send({
            email: user.email,
            password: 'TESTpwd'
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Account unverified');
            done();
          });
      });
    });

    describe('Email Verification', () => {
      it('it should send verification email', (done) => {
        chai
          .request(app)
          .post('/v1/users/verify')
          .send({
            email: user.email
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Link sent to email');
            done();
          });
      });
      it('it should return error for invalid token', (done) => {
        chai
          .request(app)
          .get('/v1/verify/regToken')
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(403);
            expect(res.body.msg)
              .to
              .equal('Invalid link');
            done();
          });
      });
      it('it should verify user', (done) => {
        chai
          .request(app)
          .get(`/v1/verify/${regToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(200);
            expect(res.text)
              .to
              .equal('Account verified successful');
            done();
          });
      });
      it('it should return message for non-existing account or already verified', (done) => {
        chai
          .request(app)
          .get(`/v1/verify/${regToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(404);
            expect(res.text)
              .to
              .equal('Account not found or already verified');
            done();
          });
      });
    });

    describe('Login verified user', () => {
      before((done) => {
        model.Users.update({
          verify: null
        }, {
          where: {
            email: [adminUser.email, user.email]
          }
        }).then(() => {
          model.Users.update({
            isAdmin: true
          }, {
            where: {
              email: [adminUser.email]
            }
          }).then(() => {
            done();
          });
        });
      });

      it('Returns an object token to the user with status coode 200', (done) => {
        chai
          .request(app)
          .post('/v1/users/login')
          .send({
            email: user.email,
            password: 'TESTpwd'
          })
          .end((err, res) => {
            nonAdminToken = res.body.token;
            expect(res)
              .to
              .be
              .status(200);
            expect(res.body.token)
              .to
              .be
              .a('string');
            expect(res.body.msg)
              .to
              .equal('login successful');
            done();
          });
      });
      it('Returns an object token to the admin user with status code 200', (done) => {
        chai
          .request(app)
          .post('/v1/users/login')
          .send({
            email: adminUser.email,
            password: 'TESTpwd'
          })
          .end((err, res) => {
            adminToken = res.body.token;
            expect(res)
              .to
              .be
              .status(200);
            expect(res.body.token)
              .to
              .be
              .a('string');
            expect(res.body.msg)
              .to
              .equal('login successful');
            done();
          });
      });
      it('Returns an error with 401 status code', (done) => {
        chai
          .request(app)
          .post('/v1/users/login')
          .send({
            email: 'abc@abc.io',
            password: 'TESTpwd'
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(404);
            expect(res.body.msg)
              .to
              .equal('User not found');
            done();
          });
      });
      it('Returns an error for invalid password with 401 status code', (done) => {
        chai
          .request(app)
          .post('/v1/users/login')
          .send({
            email: user.email,
            password: 'tester'
          })
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Invalid Username or Password');
            done();
          });
      });
    });

    describe('Password Reset', () => {
      describe('Send Reset email', () => {
        it('it should send reset password', (done) => {
          chai
            .request(app)
            .post('/v1/users/reset')
            .send({
              email: user.email
            })
            .end((err, res) => {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('An email has been sent to the requested email address.');
              done();
            });
        });
        it('it should error for non-existing user', (done) => {
          chai
            .request(app)
            .post('/v1/users/reset')
            .send({
              email: 'user.email'
            })
            .end((err, res) => {
              expect(res)
                .to
                .be
                .status(404);
              expect(res.body.msg)
                .to
                .equal('User not found');
              done();
            });
        });
      });
      describe('Reset password', () => {
        it('it should send error on invalid token', (done) => {
          chai
            .request(app)
            .post('/v1/users/reset/resetToken')
            .send({
              password: 'testPWD'
            })
            .end((err, res) => {
              expect(res)
                .to
                .be
                .status(403);
              expect(res.body.msg)
                .to
                .equal('Invalid link');
              done();
            });
        });
        it('it should send reset password', (done) => {
          chai
            .request(app)
            .post(`/v1/users/reset/${regToken}`)
            .send({
              password: 'testPWD'
            })
            .end((err, res) => {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('Password reset successful');
              done();
            });
        });
        it('it should error for non-existing user', (done) => {
          chai
            .request(app)
            .post(`/v1/users/reset/${resetToken}`)
            .send({
              password: 'testPWD'
            })
            .end((err, res) => {
              expect(res)
                .to
                .be
                .status(404);
              expect(res.body.msg)
                .to
                .equal('User not found');
              done();
            });
        });
      });
    });

    describe('Delete User', () => {
      before(() => {
        user.id = jwt.decode(nonAdminToken).id;
        adminUser.id = jwt.decode(adminToken).id;
      });

      it('Returns the error message when trying to delete another user', (done) => {
        chai
          .request(app)
          .delete(`/v1/users/${adminUser.id}/?token=${nonAdminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(401);
            expect(res.body.msg)
              .to
              .equal('Unauthorized user');
            done();
          });
      });
      it('Returns the message for deleted user', (done) => {
        chai
          .request(app)
          .delete(`/v1/users/${user.id}/?token=${nonAdminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(200);
            expect(res.body.msg)
              .to
              .equal('User deleted');
            done();
          });
      });
      it('Returns an error for invalid id', (done) => {
        chai
          .request(app)
          .delete(`/v1/users/0/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(400);
            expect(res.body.msg)
              .to
              .equal('User not found');
            done();
          });
      });
    });
  });

  after((done) => {
    model.Users.destroy({
      where: {
        email: user.email || adminUser.email
      }
    });
    done();
  });
});
