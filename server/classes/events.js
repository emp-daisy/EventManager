import moment from 'moment';
import model from '../models';
import Validator from '../middleware/validator';

const eventDb = model.Events;
/**
 *
 */
export default class Events {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  findAllEvent() {
    return eventDb
      .all()
      .then((result) => {
        if (result.length === 0) {
          this.res.status(200).json({
            msg: 'No event available'
          });
        }
        this.res.status(200).json({
          val: result,
          msg: 'Event returned'
        });
      })
      .catch(error => this.res.status(500).send(error));
  }

  findOneEvent() {
    const {
      id
    } = this.req.params.id;
    return eventDb
      .findAll({
        where: {
          id: parseInt(id, 10)
        }
      })
      .then((result) => {
        if (result.length === 0) {
          return this.res.status(400).json({
            msg: 'Event not found'
          });
        }
        this.res.status(200).json({
          val: result,
          msg: 'Event found'
        });
      })
      .catch(error => this.res.status(500).send(error));
  }

  createEvent() {
    const data = this.req.body;
    const validateRes = Validator.validateEvent(data);
    if (validateRes !== true) {
      return this.res.status(400).json({
        msg: validateRes
      });
    }
    return eventDb
      .create({
        name: data.name,
        location: parseInt(data.location, 10),
        startDate: moment(data.startDate, 'DD-MM-YYYY'),
        endDate: moment(data.endDate, 'DD-MM-YYY'),
        createdBy: parseInt(this.req.verified.id, 10),
        image: data.image
      })
      .then(result => this.res.status(201).json({
        val: result,
        msg: 'Event added successfully'
      }))
      .catch(error => this.res.status(500).send(error));
  }

  deleteEvent() {
    const {
      id
    } = this.req.params;
    return eventDb
      .findAll({
        where: {
          id: parseInt(id, 10)
        }
      })
      .then((result) => {
        if (result.length === 0) {
          return this.res.status(400).json({
            msg: 'Event not found'
          });
        }
        return eventDb
          .destroy({
            where: {
              id
            }
          })
          .then((row) => {
            if (row < 1) {
              this.res.status(500).json({
                msg: 'Error deleting events'
              });
            }
            return this.res.status(200).json({
              msg: 'Event deleted'
            });
          })
          .catch(error => this.res.status(500).send(error));
      })
      .catch(error => this.res.status(500).send(error));
  }

  updateEvent() {
    const id = parseInt(this.req.params.id, 10);
    const data = this.req.body;

    const validateRes = Validator.validateEvent(data);
    if (validateRes !== true) {
      return this.res.status(400).json({
        msg: validateRes
      });
    }
    return eventDb
      .findOne({
        where: {
          id
        }
      })
      .then((result) => {
        if (result.length === 0) {
          return this.res.status(400).json({
            msg: 'Event not found'
          });
        }
        const resJson = result.toJSON();
        const startDate = data.startDate ? moment(data.startDate, 'DD-MM-YYYY HH:mm') : false;
        const endDate = data.endDate ? moment(data.endDate, 'DD-MM-YYYY HH:mm') : false;

        return eventDb
          .update({
            name: data.name || resJson.name,
            location: parseInt(data.location, 10) || resJson.location,
            image: data.image || resJson.image,
            startDate: startDate || resJson.startDate,
            endDate: endDate || resJson.endDate,
            createdBy: resJson.createdBy
          }, {
            where: {
              id
            }
          })
          .then((value) => {
            if (value.length === 0) {
              return this.res.status(400).json({
                msg: 'Event update failed'
              });
            }
            this.res.status(200).json({
              val: value,
              msg: 'Event updated successfully'
            });
          })
          .catch(error => this.res.status(500).send(error));
      })
      .catch(error => this.res.status(500).send(error));
  }
}