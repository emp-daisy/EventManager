import chaiHttp from 'chai-http';
import chai from 'chai';
import faker from 'faker';
import bcrypt from 'bcrypt';
import async from 'async';
import app from '../app';
import model from '../models';

const {
  expect
} = chai;
chai.use(chaiHttp);
let adminToken = '',
  nonAdminToken = '',
  centerId = '';
const user = {},
  adminUser = {};

describe('Center API Testing', () => {
  before((done) => {
    adminUser.email = faker.internet.email();
    user.email = faker.internet.email();

    return async.parallel({
      // Login user
      admin: (callback) => {
        model.Users.create({
          firstName: faker
            .name
            .firstName(),
          surname: faker
            .name
            .lastName(),
          email: adminUser.email,
          password: bcrypt.hashSync('TESTpwd', bcrypt.genSaltSync(10)),
          isAdmin: true,
          verify: null
        })
          .then(() => {
            chai
              .request(app)
              .post('/v1/users/login')
              .send({
                email: adminUser.email,
                password: 'TESTpwd'
              })
              .then((res) => {
                adminToken = res.body.token;
                callback(null, 1);
              });
          });
      },
      user: (callback) => {
        // Login non-admin user
        model.Users.create({
          firstName: faker
            .name
            .firstName(),
          surname: faker
            .name
            .lastName(),
          email: user.email,
          password: bcrypt.hashSync('TESTpwd', bcrypt.genSaltSync(10)),
          verify: null
        })
          .then(() => {
            chai
              .request(app)
              .post('/v1/users/login')
              .send({
                email: user.email,
                password: 'TESTpwd'
              })
              .then((res) => {
                nonAdminToken = res.body.token;
                callback(null, 1);
              });
          });
      }
    }, () => {
      done();
    });
  });

  describe('Valid Center URL', () => {
    describe('/POST Center URL', () => {
      it('Returns the new center as an object', (done) => {
        chai
          .request(app)
          .post(`/v1/centers/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            location: faker
              .address
              .streetAddress(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            if (res.body.val) {
              centerId = res.body.val.id;
            }
            expect(res)
              .to
              .be
              .status(201);
            expect(res.body.msg)
              .to
              .equal('Center added successfully');
            done();
          });
      });
      it('Creates center without facilities', (done) => {
        chai
          .request(app)
          .post(`/v1/centers/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            location: faker
              .address
              .streetAddress(),
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            if (res.body.val) {
              centerId = res.body.val.id;
            }
            expect(res)
              .to
              .be
              .status(201);
            expect(res.body.msg)
              .to
              .equal('Center added successfully');
            done();
          });
      });
      it('Returns the error as user is not an Admin', (done) => {
        chai
          .request(app)
          .post(`/v1/centers/?token=${nonAdminToken}`)
          .send({
            name: faker
              .random
              .words(),
            location: faker
              .address
              .streetAddress(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            if (res.body.val) {
              centerId = res.body.val.id;
            }
            expect(res)
              .to
              .be
              .status(403);
            expect(res.body.msg)
              .to
              .equal('Not logged in as an Admin');
            done();
          });
      });
      it('Returns an error due to missing location field', (done) => {
        chai
          .request(app)
          .post('/v1/centers')
          .set('x-access-token', adminToken)
          .send({
            name: faker
              .random
              .words(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
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
      it('Returns an error due to missing title field', (done) => {
        chai
          .request(app)
          .post('/v1/centers')
          .set('x-access-token', adminToken)
          .send({
            location: faker
              .address
              .streetAddress(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
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
    });

    describe('/GET Center URL', () => {
      it('Returns all centers as an array of objects', (done) => {
        chai
          .request(app)
          .get('/v1/centers')
          .end((err, res) => {
            if (res.body.val) {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('Centers returned');
            } else {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('No center available');
            }
            done();
          });
      });
      it('Returns all centers as an array of objects with limit and offset set', (done) => {
        chai
          .request(app)
          .get('/v1/centers/?limit=1000&offset=2')
          .end((err, res) => {
            if (res.body.val) {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('Centers returned');
            } else {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('No center available');
            }
            done();
          });
      });
      it('Returns search result of centers as an array of objects by facilities', (done) => {
        chai
          .request(app)
          .get('/v1/centers/?facilities=foo,buzz')
          .end((err, res) => {
            if (res.body.val) {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('Centers returned');
            } else {
              expect(res)
                .to
                .be
                .status(200);
              expect(res.body.msg)
                .to
                .equal('No center available');
            }
            done();
          });
      });
      it('Returns details of a center', (done) => {
        chai
          .request(app)
          .get(`/v1/centers/${centerId}`)
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Center found');
            done();
          });
      });
      it('Returns an error status for invalid id', (done) => {
        chai
          .request(app)
          .get('/v1/centers/0')
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Center not found');
            done();
          });
      });
      it('Returns an error status for invalid id type', (done) => {
        chai
          .request(app)
          .get('/v1/centers/c')
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Invalid center Id');
            done();
          });
      });
    });

    describe('/PUT Center URL', () => {
      it('Returns the error code due to wrong id', (done) => {
        chai
          .request(app)
          .put(`/v1/centers/${centerId + 10}/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            location: faker
              .address
              .streetAddress(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Center not found');
            done();
          });
      });
      it('Returns the updated center as an object', (done) => {
        chai
          .request(app)
          .put(`/v1/centers/${centerId}/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            location: faker
              .address
              .streetAddress(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Center updated successfully');
            done();
          });
      });
      it('Returns error for missing token', (done) => {
        chai
          .request(app)
          .put(`/v1/centers/${centerId}`)
          .send({
            name: faker
              .random
              .words(),
            location: faker
              .address
              .streetAddress(),
            facilities: 'faker,random,words',
            state: faker
              .random
              .number({
                min: 1,
                max: 37
              }),
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(403);
            expect(res.text)
              .to
              .equal('Token not provided');
            done();
          });
      });
      it('Update with missing fields', (done) => {
        chai
          .request(app)
          .put(`/v1/centers/${centerId}/?token=${adminToken}`)
          .send({
            image: faker
              .system
              .directoryPath()
          })
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Center updated successfully');
            done();
          });
      });
    });

    describe('/DELETE Center URL', () => {
      it('Returns the message for deleted object', (done) => {
        chai
          .request(app)
          .delete(`/v1/centers/${centerId}/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Center deleted');
            done();
          });
      });
      it('Returns an error for invalid id', (done) => {
        chai
          .request(app)
          .delete('/v1/centers/0')
          .set('x-access-token', adminToken)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Center not found');
            done();
          });
      });
    });

    describe('GET all states fron database', () => {
      it('Returns all states as an array of objects (if any)', (done) => {
        chai
          .request(app)
          .get('/v1/states')
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(200);
            expect(res.body.msg)
              .to
              .equal('States returned');
            done();
          });
      });
    });
  });

  after((done) => {
    model.Users.destroy({
      where: {
        email: [user.email, adminUser.email]
      }
    });
    done();
  });
});
