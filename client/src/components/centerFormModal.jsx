import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Creatable, Async } from 'react-select';
import 'react-select/dist/react-select.css';
/**
 *
 *
 * @class CenterModal
 * @extends {Component}
 */
class CenterModal extends Component {
  /**
   * Creates an instance of CenterModal.
   * @param {any} props
   * @memberof CenterModal
   */
  constructor(props) {
    super(props);

    let formUpdate;
    if (!this.props.isCreate) {
      const faciliesObject = [];
      this.props.prevData.facilities.forEach((item) => {
        faciliesObject.push({ label: item.toLowerCase(), value: item });
      });
      formUpdate = {
        id: this.props.prevData.id,
        name: this.props.prevData.name,
        description: this.props.prevData.description,
        location: this.props.prevData.location,
        state: { id: this.props.prevData.stateId, name: this.props.prevData.state },
        facilities: faciliesObject
      };
    }
    this.state = {
      formData: formUpdate ||
      {
        name: '',
        description: '',
        location: '',
        state: { id: '', name: '' },
        facilities: []
      },
      errors: {
        name: { isInvalid: false, message: '' },
        location: { isInvalid: false, message: '' },
        state: { isInvalid: false, message: '' }
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
   * @memberof CenterModal
   */
  onSubmit() {
    this.resetValidation();
    if (!this.isFormInvalid()) {
      const inputData = this.state.formData;

      const data = {
        name: inputData.name,
        location: inputData.location,
        facilities: inputData.facilities.map(f => f.value).join(','),
        states: inputData.state.id
      };
      if (this.props.isCreate) {
        this.props.handleSubmit(data);
      } else {
        this.props.handleSubmit(data, inputData.id);
      }
    }
    // this.props.onClose();
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof CenterModal
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
     * @memberof CenterModal
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
   * @memberof CenterModal
   */
  isFormInvalid() {
    const { errors } = this.state;
    if (!validator.isLength(this.state.formData.name, { min: 3, max: undefined })) {
      errors.name.isInvalid = true;
      errors.name.message = 'Center name should be more than 3 characters';
    }
    if (!validator.isLength(this.state.formData.location, { min: 3, max: undefined })) {
      errors.location.isInvalid = true;
      errors.location.message = 'Address should be more than 10 characters';
    }
    if (this.state.formData.state === null || !validator.isNumeric(this.state.formData.state.id.toString())) {
      errors.state.isInvalid = true;
      errors.state.message = 'Select a state from the list';
    }
    this.setState({ errors });
    return Object.keys(errors).some(value => errors[value].isInvalid);
  }
  /**
   *
   *
   * @returns {null} Reset form errors
   * @memberof CenterModal
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
   * @returns {element} HTML element
   * @memberof CenterModal
   */
  render() {
    return (
      <div
        className="modal text-center d-block"
        id="addCenter"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Center</h1>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Name</span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Center name"
                        onChange={this.handleChange}
                        name="name"
                        defaultValue={this.state.formData.name}
                      />
                    </div>
                    {this.state.errors.name.isInvalid &&
                      <span className="error">{this.state.errors.location.message}
                      </span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Description</span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Description"
                        onChange={this.handleChange}
                        name="description"
                        defaultValue={this.state.formData.description}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Address</span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                        onChange={this.handleChange}
                        name="location"
                        defaultValue={this.state.formData.location}
                      />
                    </div>
                    {this.state.errors.location.isInvalid &&
                      <span className="error">{this.state.errors.location.message}
                      </span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">State</span>
                      <Async
                        name="states-list"
                        valueKey="id"
                        labelKey="name"
                        matchProp="label"
                        className="form-control"
                        autosize={false}
                        clearable={false}
                        placeholder="Search states..."
                        value={this.state.formData.state}
                        onChange={option => this.handleSelectChange(option, 'state')}
                        loadOptions={this.props.allStates}
                      />
                    </div>
                    {this.state.errors.state.isInvalid &&
                      <span className="error">{this.state.errors.state.message}
                      </span>}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">Facilities</span>
                      <Creatable
                        className="form-control"
                        name="facilities-input"
                        multi
                        clearable={false}
                        autosize={false}
                        matchProp="label"
                        openOnClick={false}
                        arrowRenderer={null}
                        promptTextCreator={() => 'Add new facility'}
                        placeholder="Type and press enter"
                        value={this.state.formData.facilities}
                        onChange={option => this.handleSelectChange(option, 'facilities')}
                        options={[]}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col col-md-6">
                      <button
                        type="button"
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
                        onClick={this.onSubmit}
                        className="btn btn-dark btn-block border-1 text-white py-3"
                      > {this.props.isCreate ? 'Add Center' : 'Update Center'}
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

CenterModal.defaultProps = {
  isCreate: true,
  handleSubmit: () => {},
  onClose: () => {},
  allStates: () => {},
  prevData: {}
};
CenterModal.propTypes = {
  isCreate: PropTypes.bool,
  handleSubmit: PropTypes.func,
  allStates: PropTypes.func,
  onClose: PropTypes.func,
  prevData: PropTypes.objectOf(PropTypes.any)
};
export default CenterModal;
