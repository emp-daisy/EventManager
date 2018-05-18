import chaiHttp from 'chai-http';
import chai from 'chai';
import faker from 'faker';
import app from '../app';
import model from '../models';

const { expect } = chai;
chai.use(chaiHttp);
const user = {},
  adminUser = {};

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
              .equal('User exists');
            done();
          });
      });
    });

    describe('Login', () => {
      before((done) => {
        model.Users.update({
          verify: null
        }, {
          where: { email: [user.email, adminUser.email] }
        }).then(() => {
          done();
        });
      });

      it('Returns an object token to the user with status coode 200', (done) => {
        chai
          .request(app)
          .post('/v1/users/login')
          .send({ email: user.email, password: 'TESTpwd' })
          .end((err, res) => {
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
          .send({ email: adminUser.email, password: 'TESTpwd' })
          .end((err, res) => {
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
          .send({ email: 'abc@abc.io', password: 'TESTpwd' })
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
          .send({ email: user.email, password: 'tester' })
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
