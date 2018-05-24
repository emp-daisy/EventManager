/**
 * Validation middleware
 */
import Validator from 'validatorjs';
import moment from 'moment';

/**
 * Register new rules for valoidation
 * @returns {null} no-return
 */
const registerValidation = () => {
  Validator.register(
    'customDate',
    value => moment(value, ['DD-MM-YYYY', 'DD/MM/YYYY', moment.ISO_8601], true).isValid(),
    'The :attribute is not a valid date in correct format'
  );
  Validator.register(
    'futureDate',
    value => moment(value, ['DD-MM-YYYY', 'DD/MM/YYYY', moment.ISO_8601], true).isAfter(moment()),
    'The :attribute is not a future date'
  );
};

/**
   * Validates an registration submisssion
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns  {Object} valiation response or callback
*/
const validateUser = (req, res, next) => {
  const data = req.body;
  const rules = {
    firstName: 'required|string|min:3',
    surname: 'required|string|min:3',
    email: 'required|email',
    password: 'required|string|min:6',
    confirmPassword: 'required|string|same:password'
  };
  const msg = {
    'required.firstName': 'First name required',
    'required.surname': 'Surname required',
    'required.email': 'Email required',
    'required.password': 'Password required',
    'required.confirmPassword': 'Password must be confirmed',
    'same:password': 'Password does not match'
  };

  const validation = new Validator(data, rules, msg);
  if (validation.passes()) {
    return next();
  }
  return res.status(400).json({
    msg: validation.errors.all()
  });
};
/**
   * Validates a center Object
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns  {Object} valiation response or callback
*/
const validateCenter = (req, res, next) => {
  const data = req.body;
  const rules = {
    name: 'required|string',
    location: 'required|string',
    facilities: 'commaString',
    state: 'required|integer',
    image: 'string'
  };
  const msg = {
    'required.name': 'Empty title',
    'required.location': 'Empty location',
    'required.state': 'Empty states'
  };
  Validator.register(
    'commaString',
    value => value.trim('').match(/^(\s*\w+\s*,)*(\s*\w)+$/),
    'The :attribute is not a comma-seperated string'
  );
  const validation = new Validator(data, rules, msg);

  if (validation.passes()) {
    return next();
  }
  return res.status(400).json({
    msg: validation.errors.all()
  });
};
/**
   * Validates an event object
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns  {Object} valiation response or callback
*/
const validateEvent = (req, res, next) => {
  const data = req.body;
  const rules = {
    name: 'required|string',
    location: 'required|integer',
    startDate: 'required|customDate|futureDate',
    endDate: 'required|customDate|futureDate|different:startDate',
    image: 'string'
  };
  const msg = {
    'required.name': 'Empty title',
    'required.location': 'Empty location',
    'required.startDate': 'Empty start date',
    'required.endDate': 'Empty end date',
    futureDate: 'Date is in the past',
    'differnt:startDate': 'End past before start date'
  };
  registerValidation();

  const validation = new Validator(data, rules, msg);
  if (validation.passes()) {
    return next();
  }
  return res.status(400).json({
    msg: validation.errors.all()
  });
};
/**
 * Validate event and center ID
 * @param {object} req
 * @param {object} res
 * @param {callback} next
 * @returns {Object} JSON response
 */
const validateId = (req, res, next) => {
  const {
    id
  } = req.params;
  if (Number.isNaN(+id)) {
    return res.status(400).json({
      msg: 'Invalid center Id'
    });
  }
  next();
};
export {
  validateUser,
  validateCenter,
  validateEvent,
  validateId
};
