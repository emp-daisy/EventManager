import chaiHttp from 'chai-http';
import chai from 'chai';
import bcrypt from 'bcrypt';
import async from 'async';
import faker from 'faker';
import app from '../app';
import model from '../models';

const { expect } = chai;
chai.use(chaiHttp);
let adminToken,
  nonAdminToken,
  centerId,
  eventId;
const user = {},
  adminUser = {};

describe('Event API Testing', () => {
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

  describe('Valid Event URL', () => {
    before((done) => {
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
            .number({ min: 1, max: 37 }),
          image: faker
            .system
            .directoryPath()
        })
        .end((err, res) => {
          if (res.body.val) {
            centerId = res.body.val.id;
          }
          done();
        });
    });

    describe('/POST Event URL', () => {
      it('Returns the new event as an object', (done) => {
        chai
          .request(app)
          .post(`/v1/events/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            startDate: '20/12/2099',
            endDate: '24/12/2099',
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            if (res.body.val) {
              eventId = res.body.val.id;
            }
            expect(res)
              .to
              .be
              .status(201);
            expect(res.body.msg)
              .to
              .equal('Event added successfully');
            done();
          });
      });

      it('Returns an error due to missing location field', (done) => {
        chai
          .request(app)
          .post(`/v1/events/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            startDate: '20/09/2099',
            endDate: '24/09/2099',
            image: 'file://...'
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
          .post(`/v1/events/?token=${adminToken}`)
          .send({
            startDate: '20/01/2099', endDate: '24/01/2099', location: centerId, image: 'file://...'
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
      it('Returns an error due to missing date field', (done) => {
        chai
          .request(app)
          .post(`/v1/events/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            endDate: '24/05/2099',
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            if (res.body.val) {
              eventId = res.body.val.id;
            }
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
      it('Returns an error if date is in the past', (done) => {
        chai
          .request(app)
          .post(`/v1/events/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            startDate: '20/12/2000',
            endDate: '24/12/2000',
            location: centerId,
            image: 'file://...'
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

    describe('/GET Event URL', () => {
      it('Returns all events as an array of objects', (done) => {
        chai
          .request(app)
          .get(`/v1/events/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(200);
            if (res.body.val === undefined) {
              expect(res.body.msg)
                .to
                .equal('No event available');
            } else {
              expect(res.body.msg)
                .to
                .equal('Events returned');
            }
            done();
          });
      });
      it('Returns an object array for the event', (done) => {
        chai
          .request(app)
          .get(`/v1/events/${eventId}/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Event found');
            done();
          });
      });
      it('Returns an error status for invalid id', (done) => {
        chai
          .request(app)
          .get(`/v1/events/0/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .be
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Event not found');
            done();
          });
      });
    });

    describe('/PUT Event URL', () => {
      it('Returns the error code due to wrong id', (done) => {
        chai
          .request(app)
          .put(`/v1/events/0/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            startDate: '20/10/2099',
            endDate: '24/10/2099',
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Event not found');
            done();
          });
      });
      it('Returns the updated event as an object', (done) => {
        chai
          .request(app)
          .put(`/v1/events/${eventId}/?token=${adminToken}`)
          .send({
            name: faker
              .random
              .words(),
            startDate: '20/02/2099',
            endDate: '24/02/2099',
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Event updated successfully');
            done();
          });
      });
    });

    describe('/DELETE Event URL', () => {
      it('Returns the message for deleted object', (done) => {
        chai
          .request(app)
          .delete(`/v1/events/${eventId}/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(200);
            expect(res.body.msg)
              .to
              .equal('Event deleted');
            done();
          });
      });
      it('Returns an error for invalid id', (done) => {
        chai
          .request(app)
          .delete(`/v1/events/0/?token=${adminToken}`)
          .end((err, res) => {
            expect(res)
              .to
              .have
              .status(400);
            expect(res.body.msg)
              .to
              .equal('Event not found');
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
