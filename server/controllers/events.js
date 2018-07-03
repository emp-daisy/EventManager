/**
 * Event route controller
 */
import moment from 'moment';
import sequelize from 'sequelize';
import model from '../models';
import sendEmail from '../middleware/email';
import PaginationMeta, { handleQuery } from './pagination';
/**
 * Get event by id
 * @param {int} id
 * @returns {Object} JSON response
 */
const getEvent = id => model
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
      'endDate', [sequelize.col('Center.name'), 'centerName'],
      [sequelize.col('Center.location'), 'centerLocation'],
      [sequelize.col('Center->State.name'), 'state']
    ],
    include: [{
      attributes: [],
      model: model.Centers,
      include: [{
        model: model.States,
        attributes: []
      }]
    }]
  })
  .then(result => result);


/**
 * Get all event
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const findAllEvent = (req, res) => {
  const {
    limit,
    offset,
    page,
    name,
    searchQuery
  } = handleQuery(req.query);

  return model
    .Events
    .findAndCountAll({
      limit,
      offset,
      attributes: [
        'id',
        'name',
        'location',
        'startDate',
        'endDate', [sequelize.col('Center.name'), 'centerName'],
        [sequelize.col('Center.location'), 'centerLocation'],
        [sequelize.col('Center->State.name'), 'state']
      ],
      where: {
        name: {
          [sequelize.Op.iLike]: `%${name}%`
        },
        createdBy: parseInt(req.verified.id, 10)
      },
      include: [{
        attributes: [],
        model: model.Centers,
        include: [{
          model: model.States,
          attributes: []
        }]
      }]
    })
    .then((result) => {
      const {
        rows,
        count
      } = result;
      const meta = {
        name,
        pageSize: rows.length,
        total: count,
        limit,
        offset,
        page,
        url: `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}`,
        searchQuery
      };

      res
        .status(200)
        .json({
          val: {
            centers: rows,
            meta: PaginationMeta(meta)
          },
          msg: 'Events returned'
        });
    })
    .catch(error => res.status(500).send({
      msg: 'Server Error',
      error
    }));
};
/**
 * Get single event
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const findOneEvent = (req, res) => {
  const {
    id
  } = req.params;
  return model
    .Events
    .findOne({
      where: {
        id: parseInt(id, 10),
        // startDate: {
        //   [sequelize.Op.gte]: moment()
        // },
        // endDate: {
        //   [sequelize.Op.gte]: moment()
        // }
      },
      attributes: [
        'id',
        'name',
        'location',
        'startDate',
        'endDate', [sequelize.col('Center.name'), 'centerName'],
        [sequelize.col('Center.location'), 'centerLocation'],
        [sequelize.col('Center->State.name'), 'state']
      ],
      include: [{
        attributes: [],
        model: model.Centers,
        include: [{
          model: model.States,
          attributes: []
        }]
      }]
    })
    .then((result) => {
      if (result === null) {
        return res
          .status(404)
          .json({
            msg: 'Event not found'
          });
      }
      res
        .status(200)
        .json({
          val: result,
          msg: 'Event found'
        });
    })
    .catch(error => res.status(500).send({
      msg: 'Server Error',
      error
    }));
};
/**
 * Get events by center ID
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const findEventByCenter = (req, res) => {
  const {
    id
  } = req.params;

  const {
    limit,
    offset,
    page,
    name,
    searchQuery
  } = handleQuery(req.query);

  return model
    .Events
    .findAndCountAll({
      limit,
      offset,
      attributes: [
        'id',
        'name',
        'location',
        'startDate',
        'endDate', [sequelize.col('Center.name'), 'centerName'],
        [sequelize.col('Center.location'), 'centerLocation'],
        [sequelize.col('Center->State.name'), 'state']
      ],
      where: {
        location: parseInt(id, 10)
      },
      include: [{
        attributes: [],
        model: model.Centers,
        include: [{
          model: model.States,
          attributes: []
        }]
      }]
    })
    .then((result) => {
      const {
        rows,
        count
      } = result;
      const meta = {
        name,
        pageSize: rows.length,
        total: count,
        limit,
        offset,
        page,
        url: `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}`,
        searchQuery
      };

      res
        .status(200)
        .json({
          val: {
            centers: rows,
            meta: PaginationMeta(meta)
          },
          msg: 'Events returned'
        });
    })
    .catch(error => res.status(500).send({
      msg: 'Server Error',
      error
    }));
};
/**
 * Create new event
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const createEvent = (req, res) => {
  const data = req.body;
  data.startDate = moment(data.startDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format();
  data.endDate = moment(data.endDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format();

  return model.Centers
    .findOne({
      where: {
        id: parseInt(data.location, 10)
      }
    })
    .then((locRes) => {
      if (locRes === null) {
        return res
          .status(404)
          .json({
            msg: 'Location does not exist'
          });
      }
      model
        .Events
        .findOne({
          where: {
            location: parseInt(data.location, 10),
            [sequelize.Op.or]: [{
              startDate: {
                [sequelize.Op.between]: [data.startDate, data.endDate]
              }
            }, {
              endDate: {
                [sequelize.Op.between]: [data.startDate, data.endDate]
              }
            }, {
              startDate: {
                [sequelize.Op.lte]: data.startDate
              },
              endDate: {
                [sequelize.Op.gte]: data.endDate
              }
            }]
          }
        })
        .then((doesExist) => {
          if (doesExist === null) {
            return res
              .status(400)
              .json({
                msg: 'Center already booked for this period'
              });
          }
          model
            .Events
            .create({
              name: data.name,
              location: parseInt(data.location, 10),
              startDate: data.startDate,
              endDate: data.endDate,
              createdBy: parseInt(req.verified.id, 10),
              image: data.image
            })
            .then(value => getEvent(value.id))
            .then(result => res
              .status(201)
              .json({
                val: result,
                msg: 'Event added successfully'
              }));
        })
        .catch((error) => {
          res
            .status(500)
            .send({
              msg: 'Server Error',
              error
            });
        });
    });
};

/**
 * Before updfating an event
 * @param {object} req
 * @param {object} res
 * @param {callback} next
 * @returns {Object} JSON response
 */
const preUpdate = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;

  return model
    .Events
    .findOne({
      where: {
        id,
        createdBy: parseInt(req.verified.id, 10),
      }
    })
    .then((result) => {
      if (result === null) {
        return res
          .status(404)
          .json({
            msg: 'Event not found'
          });
      }
      const resJson = result.toJSON();
      const newValues = {
        name: data.name || resJson.name,
        location: parseInt(data.location, 10) || resJson.location,
        image: data.image || resJson.image,
        startDate: data.startDate ?
          moment(data.startDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format() : false || resJson.startDate,
        endDate: data.endDate ?
          moment(data.endDate, ['DD-MM-YYYYTHH:mm', 'DD-MM-YYYY HH:mm', 'DD-MM-YYYY']).format() : false || resJson.endDate
      };
      req.body = {
        name: newValues.name,
        location: newValues.location,
        startDate: newValues.startDate,
        endDate: newValues.endDate,
        image: newValues.image,
      };
      next();
    });
};
/**
 * Update existing event
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const updateEvent = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    startDate,
    endDate,
    location,
    name,
    image
  } = req.body;
  model.Centers
    .findOne({
      where: {
        id: parseInt(location, 10)
      }
    })
    .then((result) => {
      if (result !== null) {
        return res
          .status(404)
          .json({
            msg: 'Location does not exist'
          });
      }
      return model
        .Events
        .findOne({
          where: {
            location,
            [sequelize.Op.or]: [{
              startDate: {
                [sequelize.Op.between]: [startDate, endDate]
              }
            }, {
              endDate: {
                [sequelize.Op.between]: [startDate, endDate]
              }
            }, {
              startDate: {
                [sequelize.Op.lte]: startDate
              },
              endDate: {
                [sequelize.Op.gte]: endDate
              }
            }],
            [sequelize.Op.not]: {
              id
            }
          }
        })
        .then((doesExist) => {
          if (doesExist !== null) {
            return res
              .status(400)
              .json({
                msg: 'Center already booked for this period'
              });
          }
          return model
            .Events
            .update({
              name,
              location,
              image,
              startDate,
              endDate
            }, {
              where: {
                id
              }
            })
            .then((value) => {
              if (value > 0) {
                return getEvent(id)
                  .then((resp) => {
                    if (resp) {
                      return res
                        .status(200)
                        .json({
                          val: resp,
                          msg: 'Event updated successfully'
                        });
                    }
                  });
              }
            });
        });
    })
    .catch(error => res.status(500).send({
      msg: 'Server Error',
      error
    }));
};
/**
 * Delete existing event
 * @param {object} req
 * @param {object} res
 * @returns {Object} JSON response
 */
const deleteEvent = (req, res) => {
  const {
    id
  } = req.params;
  return model
    .Events
    .findOne({
      where: {
        id: parseInt(id, 10)
      },
      include: [{
        model: model.Users,
        attributes: [
          'firstName',
          'surname',
          'email'
        ]
      }]
    })
    .then((result) => {
      if (result === null) {
        return res
          .status(404)
          .json({
            msg: 'Event not found'
          });
      } else if (result.createdBy !== req.verified.id && !req.verified.isAdmin) {
        return res
          .status(400)
          .json({
            msg: 'Unauthorized user'
          });
      }
      return model
        .Events
        .destroy({
          where: {
            id
          }
        })
        .then(() => {
          if (result.createdBy !== req.verified.id) {
            // send email notification
            sendEmail('info@daisy.io', result.User.email, 'Event Cancelled', `Hello ${result.User.firstName},

          This is to inform you that your event: "${result.name.toUpperCase()}" has been cancelled by an administrator.

          sincerly,
          Admin Team`);
          }
          return res
            .status(200)
            .json({
              msg: 'Event deleted'
            });
        });
    })
    .catch(error => res.status(500).send({
      msg: 'Server Error',
      error
    }));
};
export {
  findAllEvent,
  findOneEvent,
  createEvent,
  preUpdate,
  updateEvent,
  findEventByCenter,
  deleteEvent
};
