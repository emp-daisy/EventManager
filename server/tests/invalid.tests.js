import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const {
  expect
} = chai;
chai.use(chaiHttp);

describe('Negative URL Testing', () => {
  describe('Invalid URL', () => {
    it('Returns a 404 for invalid url', () => {
      chai
        .request(app)
        .get('/no-url')
        .end((err, res) => {
          expect(res)
            .to
            .be
            .status(404);
          expect(res.body)
            .to
            .have
            .property('error');
          expect(res.body.error)
            .to
            .have
            .property('name');
          expect(res.body.error)
            .to
            .have
            .property('message');
          expect(res.body.error)
            .to
            .equal('Error');
          expect(res.body.error)
            .to
            .equal('Invalid URL Request');
        });
    });

    it('Returns a 404 for invalid url', () => {
      chai
        .request(app)
        .post('/no-url')
        .send({
          eventId: 666,
          eventName: 'House warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res)
            .to
            .be
            .status(404);
          expect(res.body)
            .to
            .have
            .property('error');
          expect(res.body.error)
            .to
            .have
            .property('name');
          expect(res.body.error)
            .to
            .have
            .property('message');
          expect(res.body.error)
            .to
            .equal('Error');
          expect(res.body.error)
            .to
            .equal('Invalid URL Request');
        });
    });

    it('Returns a 404 for invalid url', () => {
      chai
        .request(app)
        .put('/no-url')
        .send({
          eventId: 666,
          eventName: 'House warming',
          eventLocation: 'GRA PH',
          eventDate: '12/12/2017',
          createdBy: 1
        })
        .end((err, res) => {
          expect(res)
            .to
            .be
            .status(404);
          expect(res.body)
            .to
            .have
            .property('error');
          expect(res.body.error)
            .to
            .have
            .property('name');
          expect(res.body.error)
            .to
            .have
            .property('message');
          expect(res.body.error)
            .to
            .equal('Error');
          expect(res.body.error)
            .to
            .equal('Invalid URL Request');
        });
    });
  });
});
