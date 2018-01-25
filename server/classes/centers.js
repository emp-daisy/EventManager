import sequelize from 'sequelize';
import model from '../models';
import Validator from '../middleware/validator';
/**
 * Handles the center routes
 *
 * @export
 * @class Centers
 */
export default class Centers {
  /**
   * Creates an instance of Centers.
   * @param {any} req
   * @param {any} res
   * @memberof Centers
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  /**
 *
 *
 * @returns {Object} JSON response
 * @memberof Centers
 */
  findAllCenter() {
    return model.Centers
      .all({
        attributes: [
          'id',
          'name',
          'location',
          'facilities',
          'image',
          [sequelize.col('Centers.states'), 'stateId'],
          [sequelize.col('State.name'), 'state']
        ],
        include: [
          {
            attributes: [],
            model: model.States
          }
        ]
      })
      .then((result) => {
        if (result.length === 0) {
          return this.res.status(200).json({ msg: 'No center available' });
        }
        this.res.status(200).json({ val: result, msg: 'Centers returned' });
      })
      .catch(error =>
        this.res.status(500).send({ msg: 'Server Error', error }));
  }
  /**
 *
 *
 * @returns {Object} JSON response
 * @memberof Centers
 */
  findOneCenter() {
    const { id } = this.req.params;
    return model.Centers
      .findOne({
        attributes: [
          'id',
          'name',
          'location',
          'facilities',
          'image',
          [sequelize.col('Centers.states'), 'stateId'],
          [sequelize.col('State.name'), 'state']
        ],
        where: {
          id: parseInt(id, 10)
        },
        include: [
          {
            attributes: ['id', 'name', 'startDate', 'endDate'],
            model: model.Events,
            as: 'events',
            include: [
              {
                model: model.Users,
                attributes: [
                  [
                    sequelize.fn(
                      'CONCAT',
                      sequelize.col('firstName'),
                      ' ',
                      sequelize.col('surname')
                    ),
                    'organiser'
                  ]
                ]
              }
            ]
          },
          {
            attributes: [],
            model: model.States
          }
        ]
      })
      .then((result) => {
        if (result === null) {
          return this.res.status(400).json({ msg: 'Center not found' });
        }
        this.res.status(200).json({ val: result, msg: 'Center found' });
      })
      .catch(error =>
        this.res.status(500).send({ msg: 'Server Error', error }));
  }
  /**
 * Convers an array to a stringseprated by comma
 *
 * @param {array} word
 * @returns {string} Strigifies an array
 * @memberof Centers
 */
  static splitArray(word) {
    if (!word) {
      return [];
    }
    const strArr = word
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(s => s !== '');
    return strArr;
  }
  /**
 * Creates a new center
 *
 * @returns {Object} JSON response
 * @memberof Centers
 */
  createCenter() {
    const data = this.req.body;
    data.facilities = this.splitArray(data.facilities);

    const validateRes = Validator.validateCenter(data);
    if (validateRes !== true) {
      return this.res.status(400).json({ msg: validateRes });
    }
    if (!this.req.verified.isAdmin) {
      return this.res.status(403).json({ msg: 'Not logged in as an Admin' });
    }

    return model.Centers
      .create({
        name: data.name,
        location: data.location,
        facilities: data.facilities,
        states: parseInt(data.states, 10),
        image: data.image,
        createdBy: parseInt(this.req.verified.id, 10),
        updatedBy: parseInt(this.req.verified.id, 10)
      })
      .then(result =>
        this.res
          .status(201)
          .json({ val: result, msg: 'Center added successfully' }))
      .catch(error =>
        this.res.status(500).send({ msg: 'Server Error', error }));
  }
  /**
 * Deletes a center
 *
 * @returns {Object} JSON response
 * @memberof Centers
 */
  deleteCenter() {
    const id = parseInt(this.req.params.id, 10);

    if (!this.req.verified.isAdmin) {
      return this.res.status(403).json({ msg: 'Not logged in as an Admin' });
    }
    return model.Centers
      .findOne({
        where: {
          id
        }
      })
      .then((result) => {
        if (result === null) {
          return this.res.status(400).json({ msg: 'Center not found' });
        }
        return model.Centers
          .destroy({
            where: {
              id
            }
          })
          .then((row) => {
            if (row < 1) {
              return this.res
                .status(500)
                .json({ msg: 'Error deleting center' });
            }
            return this.res.status(200).json({ msg: 'Center deleted' });
          })
          .catch(error =>
            this.res.status(500).send({ msg: 'Server Error', error }));
      })
      .catch(error =>
        this.res.status(500).send({ msg: 'Server Error', error }));
  }
  /**
   * Modifies a specific centeer
   *
   * @returns {Object} JSON response
   * @memberof Centers
   */
  updateCenter() {
    const id = parseInt(this.req.params.id, 10);
    const data = this.req.body;

    if (!this.req.verified.isAdmin) {
      return this.res.status(403).json({ msg: 'Not logged in as an Admin' });
    }

    return model.Centers
      .findOne({
        where: {
          id
        }
      })
      .then((result) => {
        if (result === null) {
          return this.res.status(400).json({ msg: 'Center not found' });
        }
        if (data.name) {
          model.Centers
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
                return this.res
                  .status(400)
                  .json({ msg: 'Center name is not unique' });
              }
            });
        }
        const resJson = result.toJSON();
        const newValues = {
          name: data.name || resJson.name,
          location: data.location || resJson.location,
          facilities: this.splitArray(data.facilities) || resJson.facilities,
          states: parseInt(data.states, 10) || resJson.states,
          image: data.image || resJson.image
        };

        const validateRes = Validator.validateCenter(newValues);
        if (validateRes !== true) {
          return this.res.status(400).json({ msg: validateRes });
        }
        return model.Centers
          .update(
            {
              name: newValues.name,
              location: newValues.location,
              facilities: newValues.facilities,
              states: newValues.states,
              image: newValues.image,
              updatedBy: parseInt(this.req.verified.id, 10)
            },
            {
              where: {
                id
              }
            }
          )
          .then((value) => {
            if (value.length === 0) {
              return this.res.status(400).json({ msg: 'Center update failed' });
            }
            this.res.status(200).json({ msg: 'Center updated successfully' });
          });
      })
      .catch(error =>
        this.res.status(500).send({ msg: 'Server Error', error }));
  }

  /**
   *
   *
   * @returns {Object} JSON response
   * @memberof Centers
   */
  getStates() {
    return model.States
      .all({
        attributes: [
          'id',
          'name'
        ]
      })
      .then((result) => {
        if (result.length === 0) {
          return this.res.status(200).json({ msg: 'No state available' });
        }
        this.res.status(200).json({ val: result, msg: 'States returned' });
      })
      .catch(error =>
        this.res.status(500).send({ msg: 'Server Error', error }));
  }
}
