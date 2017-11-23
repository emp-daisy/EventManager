import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const expect = chai;
chai.use(chaiHttp);

describe('API Testing', () => {
  describe('Valid Event URL', () => {
    it('Returns a all events as an array of objects', () => {
      chai.request(app)
        .get('/events')
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });
    it('Returns a event whose id has been sent', () => {
      chai.request(app)
        .get('/events/111')
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });

    it('Returns the addednew event as an object', () => {
      chai.request(app)
        .post('/events')
        .send({
          eventId: 666,
          eventName: 'Hosue warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(201);
        });
    });

    it('Returns the updated event as an object', () => {
      chai.request(app)
        .put('/events/222')
        .send({
          eventName: 'Hosue warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });

    it('Returns the message for deleted object', () => {
      chai.request(app)
        .delete('/events/333')
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });
  });

  describe('Valid Center URL', () => {
    it('Returns a all centers as an array of objects', () => {
      chai.request(app)
        .get('/centers')
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });
    it('Returns a center whose id has been sent', () => {
      chai.request(app)
        .get('/centers/111')
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });

    it('Returns the addednew center as an object', () => {
      chai.request(app)
        .post('/centers')
        .send({
          centerId: 666,
          centerName: 'Hosue warming',
          centerLocation: 'GRA PH',
          centerDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(201);
        });
    });

    it('Returns the updated center as an object', () => {
      chai.request(app)
        .put('/centers/222')
        .send({
          centerName: 'Hosue warming',
          centerLocation: 'GRA PH',
          centerDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });

    it('Returns the message for deleted object', () => {
      chai.request(app)
        .delete('/centers/333')
        .end((err, res) => {
          expect(res).to.be.status(200);
        });
    });
  });

  describe('Invalid URL', () => {
    it('Returns a 404 for invalid url', () => {
      chai.request(app)
        .get('/no-url')
        .end((err, res) => {
          expect(res).to.be.status(404);
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
        });
    });
  });
});
