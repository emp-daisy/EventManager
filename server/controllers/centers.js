/**
 * CENTER ROUTE CONTROLLER
 */
import sequelize from 'sequelize';
import model from '../models';
import PaginationMeta, {
  handleQuery
} from './pagination';

const getCenter = id => model.Centers
  .findOne({
    attributes: [
      'id',
      'name',
      'location',
      'facilities',
      'image', [sequelize.col('Centers.state'), 'stateId'],
      [sequelize.col('State.name'), 'state']
    ],
    where: {
      id: +id
    },
    include: [{
      attributes: [],
      model: model.States
    }]
  })
  .then(result => result);


const splitArray = (word) => {
  if (!word) {
    return [];
  }
  const strArr = word
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => s !== '');
  return strArr;
};

/**
 * Find center by ID
 * @param {object} req
 * @param {object} res
 * @return {Promises} JSON response
 */
const findOneCenter = (req, res) => {
  const {
    id
  } = req.params;
  return getCenter(id)
    .then((result) => {
      if (result === null) {
        return res.status(400).json({
          msg: 'Center not found'
        });
      }

      res.status(200).json({
        val: result,
        eventsUrl: `${req.protocol}://${req.headers.host}${req.baseUrl}/events/center/${id}`,
        msg: 'Center found'
      });
    })
    .catch(error =>
      res.status(500).send({
        msg: 'Server Error',
        error
      }));
};
/**
 * Find all centers
 * @param {object} req
 * @param {object} res
 * @return {Promises} JSON response
 */
const findAllCenter = (req, res) => {
  const {
    limit,
    offset,
    page,
    name,
    location,
    facilities,
    searchQuery
  } = handleQuery(req.query);
  const search = (facilities.length === 0) ? {
    name: {
      [sequelize.Op.iLike]: `%${name}%`
    },
    location: {
      [sequelize.Op.iLike]: `%${location}%`
    }
  } : {
    name: {
      [sequelize.Op.iLike]: `%${name}%`
    },
    location: {
      [sequelize.Op.iLike]: `%${location}%`
    },
    facilities: {
      [sequelize.Op.overlap]: facilities
    }
  };
  return model.Centers
    .findAndCountAll({
      limit,
      offset,
      where: search,
      attributes: [
        'id',
        'name',
        'location',
        'facilities',
        'image', [sequelize.col('Centers.state'), 'stateId'],
        [sequelize.col('State.name'), 'state']
      ],
      include: [{
        attributes: [],
        model: model.States
      }]
    })
    .then((result) => {
      const {
        rows,
        count
      } = result;
      const meta = {
        searchQuery,
        pageSize: rows.length,
        total: count,
        limit,
        offset,
        page,
        url: `${req.protocol}://${req.headers.host}${req.path}`
      };
      res.status(200).json({
        val: {
          centers: rows,
          meta: PaginationMeta(meta)
        },
        msg: 'Centers returned'
      });
    })
    .catch(error =>
      res.status(500).send({
        msg: 'Server Error',
        error
      }));
};
/**
 * Create new center
 * @param {object} req
 * @param {object} res
 * @return {Promises} JSON response
 */
const createCenter = (req, res) => {
  const data = req.body;
  data.facilities = splitArray(data.facilities);

  return model.Centers
    .create({
      name: data.name,
      location: data.location,
      facilities: data.facilities,
      state: parseInt(data.state, 10),
      image: data.image,
      createdBy: parseInt(req.verified.id, 10),
      updatedBy: parseInt(req.verified.id, 10)
    })
    .then(value => getCenter(value.id))
    .then((result) => {
      if (result !== null) {
        return res
          .status(201)
          .json({
            val: result,
            msg: 'Center added successfully'
          });
      }
    })
    .catch(error =>
      res.status(500).send({
        msg: 'Server Error',
        error
      }));
};
/**
 * Handle validation before updating
 * @param {object} req
 * @param {object} res
 * @param {callback} next
 * @return {Promises} JSON response
 */
const preUpdate = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;
  return getCenter(id)
    .then((result) => {
      if (result === null) {
        return res.status(400).json({
          msg: 'Center not found'
        });
      }
      const resJson = result.toJSON();
      const newValues = {
        name: data.name || resJson.name,
        location: data.location || resJson.location,
        facilities: data.facilities || resJson.facilities.join(','),
        state: data.state ? parseInt(data.state, 10) : resJson.stateId,
        image: data.image || resJson.image
      };
      req.body = {
        name: newValues.name,
        location: newValues.location,
        facilities: newValues.facilities,
        state: newValues.state,
        image: newValues.image,
      };
      return next();
    });
};
/**
 * Update center
 * @param {object} req
 * @param {object} res
 * @return {Promises} JSON response
 */
const updateCenter = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    name,
    location,
    state,
    image
  } = req.body;
  const facilities = splitArray(req.body.facilities);

  return model.Centers
    .update({
      name,
      location,
      facilities,
      state,
      image,
      updatedBy: parseInt(req.verified.id, 10)
    }, {
      where: {
        id
      }
    })
    .then((value) => {
      if (value > 0) {
        return getCenter(id);
      }
    })
    .then((resp) => {
      if (resp) {
        return res
          .status(200)
          .json({
            val: resp,
            msg: 'Center updated successfully'
          });
      }
    })
    .catch((error) => {
      res.status(500).send({
        msg: 'Server Error',
        error
      });
    });
};
/**
 * Delete center
 * @param {object} req
 * @param {object} res
 * @return {Promises} JSON response
 */
const deleteCenter = (req, res) => {
  const id = parseInt(req.params.id, 10);

  return getCenter(id)
    .then((result) => {
      if (result === null) {
        return res.status(400).json({
          msg: 'Center not found'
        });
      }
      return model.Centers
        .destroy({
          where: {
            id
          }
        })
        .then(() => res.status(200).json({
          msg: 'Center deleted'
        }));
    })
    .catch(error =>
      res.status(500).send({
        msg: 'Server Error',
        error
      }));
};
/**
 * Get all states
 * @param {object} req
 * @param {object} res
 * @return {Promises} JSON response
 */
const getStates = (req, res) => model.States
  .all({
    attributes: [
      'id',
      'name'
    ]
  })
  .then((result) => {
    res.status(200).json({
      val: result,
      msg: 'States returned'
    });
  })
  .catch(error =>
    res.status(500).send({
      msg: 'Server Error',
      error
    }));


// Export all functions
export {
  findOneCenter,
  findAllCenter,
  createCenter,
  updateCenter,
  preUpdate,
  deleteCenter,
  getStates
};
