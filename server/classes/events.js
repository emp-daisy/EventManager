import moment from 'moment';
import sequelize from 'sequelize';
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
    } = this.req.params;
    return eventDb
      .findOne({
        where: {
          id: parseInt(id, 10)
        }
      })
      .then((result) => {
        if (result === null) {
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
    eventDb.findOne({
        where: {
          location: parseInt(data.location, 10),
          startDate: {
            [sequelize.Op.lte]: moment(data.startDate, 'DD-MM-YYYY'),
            [sequelize.Op.lte]: moment(data.endDate, 'DD-MM-YYYY')
          },
          endDate: {
            [sequelize.Op.gte]: moment(data.startDate, 'DD-MM-YYYY'),
            [sequelize.Op.gte]: moment(data.endDate, 'DD-MM-YYYY')
          }
        }
      })
      .then((doesExist) => {
        if (doesExist !== null) {
          return this.res.status(400).json({
            msg: 'Center already booked for this period'
          });
        }
        eventDb.create({
            name: data.name,
            location: parseInt(data.location, 10),
            startDate: moment(data.startDate, 'DD-MM-YYYY'),
            endDate: moment(data.endDate, 'DD-MM-YYYY'),
            createdBy: parseInt(this.req.verified.id, 10),
            image: data.image
          })
          .then(result => this.res.status(201).json({
            val: result,
            msg: 'Event added successfully'
          }));
      })
      .catch((error) => {
        this.res.status(500).send(error);
      });
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
      })
      .catch(error => this.res.status(500).send(error));
  }

  updateEvent() {
    const id = parseInt(this.req.params.id, 10);
    const data = this.req.body;

    return eventDb
      .findOne({
        where: {
          id
        }
      })
      .then((result) => {
        if (result === null) {
          return this.res.status(400).json({
            msg: 'Event not found'
          });
        }
        if (data.name) {
          eventDb.findOne({
              where: {
                name: data.name,
                [sequelize.Op.not]: {
                  id
                },
              }
            })
            .then((doesExist) => {
              if (doesExist !== null) {
                return this.res.status(400).json({
                  msg: 'Event name is not unique'
                });
              }
            })
            .catch(error => this.res.status(500).send({
              msg: 'Server Error',
              error
            }));
        }
        const resJson = result.toJSON();
        const newValues = {
          name: data.name || resJson.name,
          location: parseInt(data.location, 10) || resJson.location,
          image: data.image || resJson.image,
          startDate: data.startDate ? moment(data.startDate, 'DD-MM-YYYY HH:mm') : false || resJson.startDate,
          endDate: data.endDate ? moment(data.endDate, 'DD-MM-YYYY HH:mm') : false || resJson.endDate
        };
        const validateRes = Validator.validateEvent(newValues);
        if (validateRes !== true) {
          return this.res.status(400).json({
            msg: validateRes
          });
        }
        // CHECK IF THE CENTER IS BOOKED FOR SELECTED DATES
        eventDb.findOne({
            where: {
              location: newValues.location,
              startDate: {
                [sequelize.Op.lte]: newValues.startDate,
                [sequelize.Op.lte]: newValues.endDate
              },
              endDate: {
                [sequelize.Op.gte]: newValues.startDate,
                [sequelize.Op.gte]: newValues.endDate
              },
              [sequelize.Op.not]: {
                id
              }
            }
          })
          .then((doesExist) => {
            if (doesExist !== null) {
              return this.res.status(400).json({
                msg: 'Center already booked for this period'
              });
            }
            return eventDb
              .update({
                name: newValues.name,
                location: newValues.location,
                image: newValues.image,
                startDate: newValues.startDate,
                endDate: newValues.endDate,
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
              });
          });
      })
      .catch(error => this.res.status(500).send(error));
  }
}
