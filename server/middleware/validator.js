import isValidDate from 'is-valid-date';
/**
 */
class Validator {
  validateEvent(data) {
    this.data = data;

    // if (!data.startDate) {
    //   return 'Empty date';
    // } else if (!data.name) {
    //   return 'Empty title';
    // } else if (!data.location) {
    //   return 'Empty location';
    // } else if (!data.createdBy) {
    //   return 'Empty author';
    // } else if (!isValidDate(this.data.startDate)) {
    //   return 'Invalid date';
    // } else if (isValidDate(data.startDate)) {
    //   const dateArr = this.data.eDate.split('/');
    //   const subtract = new Date() < new Date(dateArr[2], dateArr[1], dateArr[0]);
    //   if (!subtract) {
    //     return 'Date is in the past';
    //   }
    //   return true;
    // }
    return true;
  }

  validateCenter(data) {
    this.data = data;
    // if (!data.name) {
    //   return 'Empty title';
    // } else if (!data.location) {
    //   return 'Empty location';
    // }
    return true;
  }
}
export default new Validator();