import chaiHttp from 'chai-http';
import chai from 'chai';
import faker from 'faker';
import app from '../app';

const {
  expect
} = chai;
chai.use(chaiHttp);
let testToken, nonAdminToken, user, centerCount, centerId, eventCount, adminUser;

describe('API Testing', () => {
  describe('Base URL', () => {
    it('Returns an base url text', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.status(200);
          expect(res.body).to.equal('Welcome to my Event Manager API');
          done();
        });
    });
  });

  describe('Valid User URL', () => {
    describe('Registration', () => {
      it('Returns newly created user object and 201 status code', (done) => {
        chai.request(app)
          .post('/v1/users')
          .send({
            firstName: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'TESTpwd',
            confirmPassword: 'TESTpwd',
            isAdmin: faker.random.boolean()
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            expect(res.body.val).to.be.an('object');
            expect(res.body.msg).to.equal('User added successfully');
            user = res.body.val;
            done();
          });
      });
      it('Returns newly created admin user object and 201 status code', (done) => {
        chai.request(app)
          .post('/v1/users')
          .send({
            firstName: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'TESTpwd',
            confirmPassword: 'TESTpwd',
            isAdmin: true
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            expect(res.body.val).to.be.an('object');
            expect(res.body.msg).to.equal('User added successfully');
            adminUser = res.body.val;
            done();
          });
      });
      it('Returns an error message since the user exists and 400 status code', (done) => {
        chai.request(app)
          .post('/v1/users')
          .send({
            firstName: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: user.email,
            password: 'TESTpwd',
            confirmPassword: 'TESTpwd',
            isAdmin: faker.random.boolean()
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.equal('User exists');
            done();
          });
      });
    });
    describe('Login', () => {
      it('Returns an object token to the user with status coode 200', (done) => {
        chai.request(app)
          .post('/v1/users/login')
          .send({
            email: user.email,
            password: 'TESTpwd',
          })
          .end((err, res) => {
            expect(res).to.be.status(200);
            expect(res.body.token).to.be.a('string');
            expect(res.body.msg).to.equal('login successful');
            nonAdminToken = res.body.token;
            done();
          });
      });
      it('Returns an object token to the admin user with status coode 200', (done) => {
        chai.request(app)
          .post('/v1/users/login')
          .send({
            email: adminUser.email,
            password: 'TESTpwd',
          })
          .end((err, res) => {
            expect(res).to.be.status(200);
            expect(res.body.token).to.be.a('string');
            expect(res.body.msg).to.equal('login successful');
            testToken = res.body.token;
            done();
          });
      });
      it('Returns an error with 401 status code', (done) => {
        chai.request(app)
          .post('/v1/users/login')
          .send({
            email: 'abc@abc.io',
            password: 'TESTpwd',
          })
          .end((err, res) => {
            expect(res).to.be.status(404);
            expect(res.body.msg).to.equal('User not found');
            done();
          });
      });
      it('Returns an error for invalid password with 401 status code', (done) => {
        chai.request(app)
          .post('/v1/users/login')
          .send({
            email: user.email,
            password: 'tester',
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.equal('Invalid Username or Password');
            done();
          });
      });
    });
  });

  describe('Valid Center URL', () => {
    describe('/POST Center URL', () => {
      it('Returns the new center as an object', (done) => {
        chai.request(app)
          .post(`/v1/centers/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            location: faker.address.streetAddress(),
            facilities: 'faker,random,words',
            states: faker.random.number({
              min: 1,
              max: 37
            }),
            image: faker.system.directoryPath()
          })
          .end((err, res) => {
            if (res.body.val) {
              centerCount = res.body.val.id;
            }
            expect(res).to.be.status(201);
            expect(res.body.msg).to.equal('Center added successfully');
            done();
          });
      });
      it('Returns the error as user is not an Admin', (done) => {
        chai.request(app)
          .post(`/v1/centers/?token=${nonAdminToken}`)
          .send({
            name: faker.random.words(),
            location: faker.address.streetAddress(),
            facilities: 'faker,random,words',
            states: faker.random.number({
              min: 1,
              max: 37
            }),
            image: faker.system.directoryPath()
          })
          .end((err, res) => {
            if (res.body.val) {
              centerId = res.body.val.id;
            }
            expect(res).to.be.status(403);
            expect(res.body.msg).to.equal('Not logged in as an Admin');
            done();
          });
      });
      it('Returns an error due to missing location field', (done) => {
        chai.request(app)
          .post('/v1/centers')
          .set('x-access-token', testToken)
          .send({
            name: faker.random.words(),
            facilities: 'faker,random,words',
            states: faker.random.number({
              min: 1,
              max: 37
            }),
            image: faker.system.directoryPath()
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.be.an('object');
            done();
          });
      });
      it('Returns an error due to missing title field', (done) => {
        chai.request(app)
          .post('/v1/centers')
          .set('x-access-token', testToken)
          .send({
            location: faker.address.streetAddress(),
            facilities: 'faker,random,words',
            states: faker.random.number({
              min: 1,
              max: 37
            }),
            image: faker.system.directoryPath()
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.be.an('object');
            done();
          });
      });
    });

    describe('/GET Center URL', () => {
      it('Returns all centers as an array of objects (if any)', (done) => {
        chai.request(app)
          .get('/v1/centers')
          .end((err, res) => {
            if (res.body.val) {
              expect(res).to.be.status(200);
              expect(res.body.msg).to.equal('Centers returned');
            } else {
              expect(res).to.be.status(200);
              expect(res.body.msg).to.equal('No center available');
            }
            done();
          });
      });
      it('Returns details of a center', (done) => {
        chai.request(app)
          .get(`/v1/centers/${centerCount}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            expect(res.body.msg).to.equal('Center found');
            done();
          });
      });
      it('Returns an error status for invalid id', (done) => {
        chai.request(app)
          .get('/v1/centers/0')
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.equal('Center not found');
            done();
          });
      });
    });

    describe('/PUT Center URL', () => {
      it('Returns the error code due to wrong id', (done) => {
        chai.request(app)
          .put(`/v1/centers/${centerCount + 10}/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            location: faker.address.streetAddress(),
            facilities: 'faker,random,words',
            states: faker.random.number({
              min: 1,
              max: 37
            }),
            image: faker.system.directoryPath()
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.msg).to.equal('Center not found');
            done();
          });
      });
      it('Returns the updated center as an object', (done) => {
        chai.request(app)
          .put(`/v1/centers/${centerCount}/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            location: faker.address.streetAddress(),
            facilities: 'faker,random,words',
            states: faker.random.number({
              min: 1,
              max: 37
            }),
            image: faker.system.directoryPath()
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal('Center updated successfully');
            done();
          });
      });
    });

    describe('/DELETE Center URL', () => {
      it('Returns the message for deleted object', (done) => {
        chai.request(app)
          .delete(`/v1/centers/${centerCount}/?token=${testToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal('Center deleted');
            done();
          });
      });
      it('Returns an error for invalid id', (done) => {
        chai.request(app)
          .delete('/v1/centers/0')
          .set('x-access-token', testToken)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.msg).to.equal('Center not found');
            done();
          });
      });
    });
  });

  describe('Valid Event URL', () => {
    describe('/POST Event URL', () => {
      it('Returns the new event as an object', (done) => {
        const date = faker.date.future();
        chai.request(app)
          .post(`/v1/events/?token=${testToken}`)
          .set('x-access-token', testToken)
          .send({
            name: faker.random.words(),
            startDate: date,
            endDate: faker.date.future(5, date),
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            expect(res.body.msg).to.equal('Event added successfully');
            eventCount = res.body.val.id;
            done();
          });
      });

      it('Returns an error due to missing location field', (done) => {
        chai.request(app)
          .post(`/v1/events/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.be.an('object');
            done();
          });
      });

      it('Returns an error due to missing title field', (done) => {
        chai.request(app)
          .post(`/v1/events/?token=${testToken}`)
          .send({
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.be.an('object');
            done();
          });
      });
      it('Returns an error due to missing date field', (done) => {
        chai.request(app)
          .post(`/v1/events/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            endDate: faker.date.future(),
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            if (res.body.val) {
              eventCount = res.body.val.id;
            }
            expect(res).to.be.status(400);
            expect(res.body.msg).to.be.an('object');
            done();
          });
      });
      it('Returns an error if date is in the past', (done) => {
        chai.request(app)
          .post(`/v1/events/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            startDate: faker.date.past(),
            endDate: faker.date.past(),
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.be.an('object');
            done();
          });
      });
    });

    describe('/GET Event URL', () => {
      it('Returns all events as an array of objects', (done) => {
        chai.request(app)
          .get('/v1/events')
          .end((err, res) => {
            expect(res).to.be.status(200);
            if (res.body.val === undefined) {
              expect(res.body.msg).to.equal('No event available');
            } else {
              expect(res.body.msg).to.equal('Events returned');
            }
            done();
          });
      });
      it('Returns an object array for the event', (done) => {
        chai.request(app)
          .get(`/v1/events/${eventCount}`)
          .end((err, res) => {
            expect(res).to.be.status(200);
            expect(res.body.msg).to.equal('Event found');
            done();
          });
      });
      it('Returns an error status for invalid id', (done) => {
        chai.request(app)
          .get('/v1/events/0')
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.equal('Event not found');
            done();
          });
      });
    });

    describe('/PUT Event URL', () => {
      it('Returns the error code due to wrong id', (done) => {
        const date = faker.date.future();
        chai.request(app)
          .put(`/v1/events/0/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            startDate: date,
            endDate: faker.date.future(5, date),
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.msg).to.equal('Event not found');
            done();
          });
      });
      it('Returns the updated event as an object', (done) => {
        const date = faker.date.future();
        chai.request(app)
          .put(`/v1/events/${eventCount}/?token=${testToken}`)
          .send({
            name: faker.random.words(),
            startDate: date,
            endDate: faker.date.future(5, date),
            location: centerId,
            image: 'file://...'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal('Event updated successfully');
            done();
          });
      });
    });

    describe('/DELETE Event URL', () => {
      it('Returns the message for deleted object', (done) => {
        chai.request(app)
          .delete(`/v1/events/${eventCount}/?token=${testToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal('Event deleted');
            done();
          });
      });
      it('Returns an error for invalid id', (done) => {
        chai.request(app)
          .delete(`/v1/events/0/?token=${testToken}`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.msg).to.equal('Event not found');
            done();
          });
      });
    });
  });

  describe('POST with invalid token', () => {
    it('Returns an error due to fake or expired token', (done) => {
      chai.request(app)
        .post('/v1/centers/?token=faketoken')
        .send({
          name: faker.random.words(),
          location: faker.address.streetAddress(),
          facilities: 'faker,random,words',
          states: faker.random.number({
            min: 1,
            max: 37
          }),
          image: faker.system.directoryPath()
        })
        .end((err, res) => {
          expect(res).to.be.status(403);
          done();
        });
    });
    it('Returns an error due to missing token', (done) => {
      chai.request(app)
        .post('/v1/centers/')
        .send({
          name: faker.random.words(),
          location: faker.address.streetAddress(),
          facilities: 'faker,random,words',
          states: faker.random.number({
            min: 1,
            max: 37
          }),
          image: faker.system.directoryPath()
        })
        .end((err, res) => {
          expect(res).to.be.status(403);
          done();
        });
    });
  });

  describe('Invalid URL', () => {
    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .get('/no-url')
        .end((err, res) => {
          expect(res).to.be.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('name');
          expect(res.body.error).to.have.property('message');
          expect(res.body.error).to.equal('Error');
          expect(res.body.error).to.equal('Invalid URL Request');
        });
    });

    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .post('/no-url')
        .send({
          eventId: 666,
          eventName: 'House warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('name');
          expect(res.body.error).to.have.property('message');
          expect(res.body.error).to.equal('Error');
          expect(res.body.error).to.equal('Invalid URL Request');
        });
    });

    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .put('/no-url')
        .send({
          eventId: 666,
          eventName: 'House warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('name');
          expect(res.body.error).to.have.property('message');
          expect(res.body.error).to.equal('Error');
          expect(res.body.error).to.equal('Invalid URL Request');
        });
    });
  });
});
