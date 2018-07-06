import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Async } from 'react-select';
/**
 *
 *
 * @class EventModal
 * @extends {Component}
 */
class EventModal extends Component {
  /**
   * Creates an instance of EventModal.
   * @param {any} props
   * @memberof EventModal
  */
  constructor(props) {
    super(props);
    let formUpdate;
    if (!this.props.isCreate) {
      formUpdate = {
        id: this.props.prevData.id,
        name: this.props.prevData.name,
        description: this.props.prevData.description,
        location: {
          id: this.props.prevData.location,
          name: `${this.props.prevData.centerName}, ${this.props.prevData.centerLocation}, ${this.props.prevData.state}`
        },
        startDate: this.props.prevData.startDate,
        endDate: this.props.prevData.endDate
      };
    }
    this.state = {
      formData: formUpdate || {
        name: '',
        description: '',
        location: this.props.center || { id: '', name: '' },
        startDate: '',
        endDate: ''
      },
      errors: {
        name: { isInvalid: false, message: '' },
        location: { isInvalid: false, message: '' },
        startDate: { isInvalid: false, message: '' },
        endDate: { isInvalid: false, message: '' }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.resetValidation = this.resetValidation.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof EventModal
   */
  onSubmit() {
    this.resetValidation();
    if (!this.isFormInvalid()) {
      const inputData = this.state.formData;

      const data = {
        name: inputData.name,
        location: inputData.location.id,
        startDate: moment(inputData.startDate).format('DD-MM-YYYY HH:mm').toString(),
        endDate: moment(inputData.endDate).format('DD-MM-YYYY HH:mm').toString()
      };
      if (this.props.isCreate) {
        this.props.handleSubmit(data);
      } else {
        this.props.handleSubmit(data, inputData.id);
      }
      this.props.onClose();
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof EventModal
   */
  handleChange(event) {
    this.setState({
      formData: Object.assign({}, this.state.formData, {
        [event.target.name]: event.target.value
      })
    });
  }
  /**
     *
     * @returns {null} no return
     * @param {any} option
     * @param {any} name
     * @memberof EventModal
     */
  handleSelectChange(option, name) {
    this.setState({
      formData: Object.assign({}, this.state.formData, {
        [name]: option
      })
    });
  }
  /**
   *
   *
   * @returns {boolean} if form field is valid
   * @memberof EventModal
   */
  isFormInvalid() {
    const { errors } = this.state;
    if (this.state.formData.name.length < 3) {
      errors.name.isInvalid = true;
      errors.name.message = 'Event name should be more than 3 characters';
    }
    if (this.state.formData.location === null ||
      this.state.formData.location.id === '') {
      errors.location.isInvalid = true;
      errors.location.message = 'Select a center from the list';
    }
    if (this.state.formData.startDate.length === 0 ||
      !moment(this.state.formData.startDate).isAfter()) {
      errors.startDate.isInvalid = true;
      errors.startDate.message = 'Invalid start date for event';
    }
    if (this.state.formData.endDate.length === 0 ||
      !moment(this.state.formData.endDate).isAfter(this.state.formData.startDate)) {
      errors.endDate.isInvalid = true;
      errors.endDate.message = 'Invalid end date for event. Date must be after the start date';
    }
    this.setState({ errors });
    return Object.keys(errors).some(value => errors[value].isInvalid);
  }
  /**
   *
   *
   * @returns {null} Reset form errors
   * @memberof EventModal
   */
  resetValidation() {
    const { errors } = this.state;

    Object.keys(errors).map((key) => {
      errors[key].isInvalid = false;
      errors[key].message = '';
      return errors[key];
    });
    this.setState({ errors });
  }
  /**
   *
   *
   * @returns {null} HTML element
   * @memberof EventModal
   */
  render() {
    return (
      <div
        className="modal text-center d-block"
        id="eventModalForm"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Event</h1>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Event Name</span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Event name"
                        onChange={this.handleChange}
                        name="name"
                        defaultValue={this.state.formData.name}
                      />
                    </div>
                    {this.state.errors.name.isInvalid &&
                      <span className="error">{this.state.errors.name.message}
                      </span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Description</span>
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        onChange={this.handleChange}
                        name="description"
                        rows="5"
                        defaultValue={this.state.formData.description}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Center Address</span>
                      { !this.props.isCreate && <Async
                        name="center-list"
                        valueKey="id"
                        labelKey="name"
                        matchProp="label"
                        autosize={false}
                        clearable={false}
                        className="form-control"
                        placeholder="Search for location..."
                        value={this.state.formData.location}
                        onChange={option =>
                          this.handleSelectChange(option, 'location')}
                        loadOptions={this.props.allCenters}
                      />}
                      {this.props.isCreate &&
                      <input
                        className="form-control"
                        type="text"
                        disabled
                        defaultValue={this.state.formData.location.name}
                      />}
                    </div>
                    {this.state.errors.location.isInvalid &&
                      <span className="error">{this.state.errors.location.message}
                      </span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Start Date</span>
                      <input
                        id="startDate"
                        className="form-control"
                        type="datetime-local"
                        placeholder="Start Date"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        onChange={this.handleChange}
                        name="startDate"
                        defaultValue={moment(this.state.formData.startDate).format('YYYY-MM-DDTHH:mm')}
                      />
                    </div>
                    {this.state.errors.startDate.isInvalid &&
                      <span className="error">{this.state.errors.startDate.message}
                      </span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">End Date</span>
                      <input
                        id="endDate"
                        className="form-control"
                        type="datetime-local"
                        placeholder="End Date"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        onChange={this.handleChange}
                        name="endDate"
                        defaultValue={moment(this.state.formData.endDate).format('YYYY-MM-DDTHH:mm')}
                      />
                    </div>
                    {this.state.errors.endDate.isInvalid &&
                      <span className="error">{this.state.errors.endDate.message}
                      </span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group col col-md-6">
                      <button
                        type="button"
                        id="btnCancelEvent"
                        className="btn btn-block border-1 text-black py-3 btn-light btn-block"
                        data-dismiss="modal"
                        onClick={this.props.onClose}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="form-group col col-md-6">
                      <button
                        type="button"
                        id="btnAcceptEvent"
                        onClick={this.onSubmit}
                        className="btn btn-dark btn-block border-1 text-white py-3"
                      >
                        {this.props.isCreate ? 'Add Event' : 'Update Event'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventModal.defaultProps = {
  isCreate: true,
  handleSubmit: () => {},
  onClose: () => {},
  allCenters: () => {},
  center: {},
  prevData: {}
};
EventModal.propTypes = {
  isCreate: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onClose: PropTypes.func,
  allCenters: PropTypes.func,
  prevData: PropTypes.objectOf(PropTypes.any),
  center: PropTypes.objectOf(PropTypes.any)
};
export default EventModal;
