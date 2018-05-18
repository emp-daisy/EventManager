import moment from 'moment';
import sequelize from 'sequelize';
import model from '../models';
import Validator from '../middleware/validator';
import sendEmail from '../middleware/email';

/**
 * Class handling events routing
 * @export
 * @class Events
 */
export default class Events {
  /**
   * Creates an instance of Events.
   * @param {any} req
   * @param {any} res
   * @memberof Events
  */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /**
   * Returns an events created by a user
   *
   * @returns {Object} JSON object for all events with status code
   * @memberof Events
   */
  findAllEvent() {
    return model
      .Events
      .findAll({
        attributes: [
          'id',
          'name',
          'location',
          'startDate',
          'endDate'
        ],
        where: {
          createdBy: parseInt(this.req.verified.id, 10),
          startDate: { [sequelize.Op.gte]: moment() },
          endDate: { [sequelize.Op.gte]: moment() }
        },
        include: [
          {
            attributes: [
              'name',
              'location'
            ],
            model: model.Centers,
            include: [
              {
                model: model.States,
                attributes: ['name']
              }
            ]
          }
        ]
      })
      .then((result) => {
        if (result.length === 0) {
          return this
            .res
            .status(200)
            .json({ msg: 'No event available' });
        }
        this
          .res
          .status(200)
          .json({ val: result, msg: 'Events returned' });
      })
      .catch(error => this.res.status(500).send({ msg: 'Server Error', error }));
  }

  /**
   * Returns detals of an event
   *
   * @returns {Object} JSON object for an event detail with status code
   * @memberof Events
   */
  findOneEvent() {
    const { id } = this.req.params;
    return model
      .Events
      .findOne({
        where: {
          id: parseInt(id, 10),
          startDate: { [sequelize.Op.gte]: moment() },
          endDate: { [sequelize.Op.gte]: moment() }
        },
        attributes: [
          'id',
          'name',
          'location',
          'startDate',
          'endDate'
        ],
        include: [
          {
            attributes: [
              'name',
              'location'
            ],
            model: model.Centers,
            include: [
              {
                model: model.States,
                attributes: ['name']
              }
            ]
          }
        ]
      })
      .then((result) => {
        if (result === null) {
          return this
            .res
            .status(400)
            .json({ msg: 'Event not found' });
        }
        this
          .res
          .status(200)
          .json({ val: result, msg: 'Event found' });
      })
      .catch(error => this.res.status(500).send({ msg: 'Server Error', error }));
  }

  /**
   * Creates a new event
   *
   * @returns {Object} JSON object with message and status code
   * @memberof Events
   */
  createEvent() {
    const data = this.req.body;
    data.startDate = moment(data.startDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format();
    data.endDate = moment(data.endDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format();

    const validateRes = Validator.validateEvent(data);
    if (validateRes !== true) {
      return this
        .res
        .status(400)
        .json({ msg: validateRes });
    }
    model
      .Events
      .findOne({
        where: {
          location: parseInt(data.location, 10),
          [sequelize.Op.or]: {
            startDate: {
              [sequelize.Op.between]: [data.startDate, data.endDate]
            },
            endDate: {
              [sequelize.Op.between]: [data.startDate, data.endDate]
            }
          }
        }
      })
      .then((doesExist) => {
        if (doesExist !== null) {
          return this
            .res
            .status(400)
            .json({ msg: 'Center already booked for this period' });
        }
        model
          .Events
          .create({
            name: data.name,
            location: parseInt(data.location, 10),
            startDate: data.startDate,
            endDate: data.endDate,
            createdBy: parseInt(this.req.verified.id, 10),
            image: data.image
          })
          .then(value => this.constructor.getEvent(value.id))
          .then((result) => {
            if (result !== null) {
              return this.res
                .status(201)
                .json({ val: result, msg: 'Event added successfully' });
            }
            return this.res
              .status(500)
              .json({ msg: 'Error creating an event' });
          });
      })
      .catch((error) => {
        this
          .res
          .status(500)
          .send({ msg: 'Server Error', error });
      });
  }

  /**
   * Modifies an event
   *
   * @returns {Object} JSON object with updated event, message and status code
   * @memberof Events
   */
  updateEvent() {
    const id = parseInt(this.req.params.id, 10);
    const data = this.req.body;

    return model
      .Events
      .findOne({
        where: {
          id,
          createdBy: parseInt(this.req.verified.id, 10),
        }
      })
      .then((result) => {
        if (result === null) {
          return this
            .res
            .status(400)
            .json({ msg: 'Event not found' });
        }
        if (data.name) {
          model
            .Events
            .findOne({
              where: {
                name: data.name,
                [sequelize.Op.not]: {
                  id
                }
              }
            })
            .then((doesExist) => {
              if (doesExist !== null) {
                return this
                  .res
                  .status(400)
                  .json({ msg: 'Event name is not unique' });
              }
            })
            .catch(error => this.res.status(500).send({ msg: 'Server Error', error }));
        }
        const resJson = result.toJSON();
        const newValues = {
          name: data.name || resJson.name,
          location: parseInt(data.location, 10) || resJson.location,
          image: data.image || resJson.image,
          startDate: data.startDate
            ? moment(data.startDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format()
            : false || resJson.startDate,
          endDate: data.endDate
            ? moment(data.endDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format()
            : false || resJson.endDate
        };
        const validateRes = Validator.validateEvent(newValues);
        if (validateRes !== true) {
          return this
            .res
            .status(400)
            .json({ msg: validateRes });
        }
        // CHECK IF THE CENTER IS BOOKED FOR SELECTED DATES
        model
          .Events
          .findOne({
            where: {
              location: newValues.location,
              [sequelize.Op.or]: {
                startDate: {
                  [sequelize.Op.between]: [newValues.startDate, newValues.endDate]
                },
                endDate: {
                  [sequelize.Op.between]: [newValues.startDate, newValues.endDate]
                }
              },
              [sequelize.Op.not]: {
                id
              }
            }
          })
          .then((doesExist) => {
            if (doesExist !== null) {
              return this
                .res
                .status(400)
                .json({ msg: 'Center already booked for this period' });
            }
            return model
              .Events
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
                if (value > 0) { return this.constructor.getEvent(id); }
              })
              .then((res) => {
                if (res) {
                  return this.res
                    .status(200)
                    .json({ val: res, msg: 'Event updated successfully' });
                }
                return this.res
                  .status(500)
                  .json({ msg: 'Error updating an event' });
              });
          });
      })
      .catch(error => this.res.status(500).send({ msg: 'Server Error', error }));
  }

  /**
   * Deletes an event
   *
   * @returns {Object} JSON object with message and status code
   * @memberof Events
   */
  deleteEvent() {
    const { id } = this.req.params;
    return model
      .Events
      .findOne({
        where: {
          id: parseInt(id, 10)
        },
        include: [
          {
            model: model.Users,
            attributes: [
              'firstName',
              'surname',
              'email'
            ]
          }
        ]
      })
      .then((result) => {
        if (result === null) {
          return this
            .res
            .status(400)
            .json({ msg: 'Event not found' });
        } else if (result.createdBy !== this.req.verified.id && !this.req.verified.isAdmin) {
          return this
            .res
            .status(400)
            .json({ msg: 'Unauthorized user' });
        }
        return model
          .Events
          .destroy({
            where: {
              id
            }
          })
          .then((row) => {
            if (row < 1) {
              return this
                .res
                .status(500)
                .json({ msg: 'Error deleting events' });
            }
            if (result.createdBy !== this.req.verified.id) {
              // send email notification
              sendEmail('info@daisy.io', result.User.email, 'Event Cancelled', `Hello ${result.User.firstName},
            
            This is to inform you that your event: "${result.name.toUpper()}"" has been cancelled by an administrator.
            
            sincerly,
            Admin Team`);
            }
            return this
              .res
              .status(200)
              .json({ msg: 'Event deleted' });
          });
      })
      .catch(error => this.res.status(500).send({ msg: 'Server Error', error }));
  }

  /**
   * Returns detals of an event
   *
   * @returns {Object} JSON object for an event detail with status code
   * @param {any} id
   * @memberof Events
   */
  static getEvent(id) {
    return model
      .Events
      .findOne({
        where: {
          id: parseInt(id, 10)
        },
        attributes: [
          'id',
          'name',
          'location',
          'startDate',
          'endDate'
        ],
        include: [
          {
            attributes: [
              'name',
              'location'
            ],
            model: model.Centers,
            include: [
              {
                model: model.States,
                attributes: ['name']
              }
            ]
          }
        ]
      })
      .then(result => result)
      .catch(() => {});
  }
}
