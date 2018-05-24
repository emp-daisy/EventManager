import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import isEmail from 'validator/lib/isEmail';
import { forgottenPassword } from '../actions/authentication';

/**
 *
 *
 * @class ForgottenPassword
 * @extends {Component}
 */
class ForgottenPassword extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberof ForgottenPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: { email: false }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  /**
    *
    *
    * @returns {null} no return
    * @param {event} event
    * @memberof ForgottenPassword
    */
  onSubmit() {
    const { errors } = this.state;

    errors.email = !isEmail(this.state.email);

    this.setState({ errors }, () => {
      if (!this.state.errors.email) {
        this.props.forgottenPassword(this.state.email);
        // this.props.onCancel();
      }
    });
  }
  /**
    *
    *
    * @returns {null} no return
    * @param {event} event
    * @memberof ForgottenPassword
    */
  onTextChange(event) {
    this.setState({ email: event.target.value });
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof ForgottenPassword
   */
  render() {
    return (
      <div
        className="modal text-center d-block"
        id="resetUser"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Reset Password</h1>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={this.onTextChange}
                    type="text"
                    placeholder="Email"
                    name="email"
                  />
                  {this.state.errors.email &&
                  <span className="error">Invalid email address
                  </span>}
                </div>
                <div className="form-row">
                  <div className="form-group col col-md-6">
                    <button
                      type="button"
                      className="btn btn-block border-1 text-black py-3 btn-light btn-block"
                      data-dismiss="modal"
                      onClick={this.props.onCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="form-group col col-md-6">
                    <button
                      type="button"
                      onClick={this.onSubmit}
                      disabled={this.state.email.length < 1}
                      className="btn btn-dark btn-block border-1 text-white py-3"
                    >Send Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.user.isLoading,
  alert: state.user.error,
  alertMessage: state.user.errorMessage
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      forgottenPassword
    },
    dispatch
  );


ForgottenPassword.defaultProps = {
  onCancel: () => {}
};
ForgottenPassword.propTypes = {
  onCancel: PropTypes.func,
  forgottenPassword: PropTypes.func.isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(ForgottenPassword);
