import Validator from 'validatorjs';
import moment from 'moment';
/**
 *
 * @class Validation
 */
class Validation {
  /**
   * Validates an event submisssion
   *
   * @param {any} data
   * @returns  {Object} valiation response
   * @memberof Validation
   */
  validateEvent(data) {
    this.data = data;
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
    Validator.register(
      'customDate',
      value => moment(value).isValid(),
      'The :attribute is not a valid sate in format DD/MM/YYYY'
    );

    Validator.register(
      'futureDate',
      value => moment(value).isAfter(moment()),
      'The :attribute is not a future date'
    );

    const validation = new Validator(data, rules, msg);

    return validation.passes() ? true : validation.errors.all();
  }
  /**
   * Validates a center submisssion
   *
   * @param {any} data
   * @returns  {Object} valiation response
   * @memberof Validation
   */
  validateCenter(data) {
    this.data = data;
    const rules = {
      name: 'required|string',
      location: 'required|string',
      facilities: 'array',
      states: 'required|integer',
      image: 'string'
    };
    const msg = {
      'required.name': 'Empty title',
      'required.location': 'Empty location',
      'required.states': 'Empty states'
    };

    const validation = new Validator(data, rules, msg);

    return validation.passes() ? true : validation.errors.all();
  }
  /**
   * Validates an registration submisssion
   *
   * @param {any} data
   * @returns  {Object} valiation response
   * @memberof Validation
   */
  validateUser(data) {
    this.data = data;
    const rules = {
      firstName: 'required|string|min:3',
      surname: 'required|string|min:3',
      email: 'required|email',
      password: 'required|string|min:6',
      confirmPassword: 'required|string|same:password'
    };
    const msg = {
      'required.firstName': 'First name required',
      'required.location': 'Surname required',
      'required.states': 'Email required',
      'required.password': 'Password required',
      'required.confirmPassword': 'Password must be confirmed required',
      'same:password': 'Password does not match'
    };

    const validation = new Validator(data, rules, msg);
    return validation.passes() ? true : validation.errors.all();
  }
}
export default new Validation();
