import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const {
  expect
} = chai;
const should = chai.should();
chai.use(chaiHttp);

describe('API Testing', () => {
  describe('Valid Event URL', () => {
    describe('/GET Event URL', () => {
      it('Returns all events as an array of objects', (done) => {
        chai.request(app)
          .get('/v1/events')
          .end((err, res) => {
            expect(res).to.be.status(200);
            done();
          });
      });
      it('Returns all events as in array', (done) => {
        chai.request(app)
          .get('/v1/events/231')
          .end((err, res) => {
            expect(res).to.be.status(200);
            done();
          });
      });
      it('Returns an error status for invalid id', (done) => {
        chai.request(app)
          .get('/v1/events/123')
          .end((err, res) => {
            expect(res).to.be.status(400);
            done();
          });
      });
    });

    describe('/POST Event URL', () => {
      it('Returns the new event as an object', (done) => {
        chai.request(app)
          .post('/v1/events')
          .send({
            id: 666,
            name: 'Hosue warming',
            location: 'GRA PH',
            eDate: '12/12/2017',
            user: 1
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            done();
          });
      });

      it('Returns an error due to missing field', (done) => {
        chai.request(app)
          .post('/v1/events')
          .send({
            id: 666,
            name: 'Hosue warming',
            eDate: '12/12/2017',
            user: 1
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.equal('Empty location');
            done();
          });
      });
    });

    describe('/PUT Event URL', () => {
      it('Returns the error code due to wrong id', (done) => {
        chai.request(app)
          .put('/v1/events/222')
          .send({
            name: 'Hosue warming',
            location: 'GRA PH',
            eDate: '12/12/2017',
            user: 1
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Returns error code due to empty field', (done) => {
        chai.request(app)
          .put('/v1/events/231')
          .send({
            name: 'Hosue warming',
            location: 'GRA PH',
            user: 1
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Returns the updated event as an object', (done) => {
        chai.request(app)
          .put('/v1/events/231')
          .send({
            name: 'Hosue warming',
            location: 'GRA PH',
            eDate: '12/12/2017',
            user: 1
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('/DELETE Event URL', () => {
      it('Returns the message for deleted object', (done) => {
        chai.request(app)
          .delete('/v1/events/235')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('Returns an error for invalid id', (done) => {
        chai.request(app)
          .delete('/v1/events/333')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });

  describe('Valid Center URL', () => {
    describe('/GET Center URL', () => {
      it('Returns all centers as an array of objects', (done) => {
        chai.request(app)
          .get('/v1/centers')
          .end((err, res) => {
            expect(res).to.be.status(200);
            done();
          });
      });
      it('Returns all centers as in array', (done) => {
        chai.request(app)
          .get('/v1/centers/222')
          .end((err, res) => {
            expect(res).to.be.status(200);
            done();
          });
      });
      it('Returns an error status for invalid id', (done) => {
        chai.request(app)
          .get('/v1/centers/123')
          .end((err, res) => {
            expect(res).to.be.status(400);
            done();
          });
      });
    });

    describe('/POST Center URL', () => {
      it('Returns the new center as an object', (done) => {
        chai.request(app)
          .post('/v1/centers')
          .send({
            id: 666,
            name: 'Hosue warming',
            location: 'GRA PH'
          })
          .end((err, res) => {
            expect(res).to.be.status(201);
            done();
          });
      });

      it('Returns an error due to missing field', (done) => {
        chai.request(app)
          .post('/v1/centers')
          .send({
            id: 666,
            name: 'Hosue warming'
          })
          .end((err, res) => {
            expect(res).to.be.status(400);
            expect(res.body.msg).to.equal('Empty location');
            done();
          });
      });
    });

    describe('/PUT Center URL', () => {
      it('Returns the error code due to wrong id', (done) => {
        chai.request(app)
          .put('/v1/centers/227')
          .send({
            name: 'Hosue warming',
            location: 'GRA PH'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Returns error code due to empty field', (done) => {
        chai.request(app)
          .put('/v1/centers/222')
          .send({
            name: 'Hosue warming'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Returns the updated center as an object', (done) => {
        chai.request(app)
          .put('/v1/centers/222')
          .send({
            name: 'Hosue warming',
            location: 'GRA PH'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('/DELETE Center URL', () => {
      it('Returns the message for deleted object', (done) => {
        chai.request(app)
          .delete('/v1/centers/222')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('Returns an error for invalid id', (done) => {
        chai.request(app)
          .delete('/v1/centers/132')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });

  describe('Invalid URL', () => {
    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .get('/no-url')
        .end((err, res) => {
          expect(res).to.be.status(404);
          res.body.should.have.property('error');
          res.body.error.should.have.property('name');
          res.body.error.should.have.property('message');
          res.body.error.name.should.equals('Error');
          res.body.error.messageshould.have.equals('Invalid URL Request');
        });
    });

    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .post('/no-url')
        .send({
          eventId: 666,
          eventName: 'Hosue warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(404);
          res.body.should.have.property('error');
          res.body.error.should.have.property('name');
          res.body.error.should.have.property('message');
          res.body.error.name.should.equals('Error');
          res.body.error.messageshould.have.equals('Invalid URL Request');
        });
    });

    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .put('/no-url')
        .send({
          eventId: 666,
          eventName: 'Hosue warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(404);
          res.body.should.have.property('error');
          res.body.error.should.have.property('name');
          res.body.error.should.have.property('message');
          res.body.error.name.should.equals('Error');
          res.body.error.messageshould.have.equals('Invalid URL Request');
        });
    });
  });
});
