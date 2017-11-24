import isValidDate from 'is-valid-date';
/**
 */
class Validator {
  validateEvent(data) {
    this.data = data;
    if (!isValidDate(this.data.eDate)) {
      return 'Invalid date';
    } else if (!data.name) {
      return 'Empty title';
    } else if (!data.location) {
      return 'Empty location';
    } else if (!data.user) {
      return 'Empty author';
    }
    return true;
  }

  validateCenter(data) {
    this.data = data;
    if (!data.name) {
      return 'Empty title';
    } else if (!data.location) {
      return 'Empty location';
    }
    return true;
  }
}
export default new Validator();
