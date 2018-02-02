import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { resetPassword, isResetTokenValid } from '../actions/authentication';
import Header from './header';
import Footer from './footer';
import Spinner from './spinner';

/**
 *
 *
 * @class ResetPassword
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof ResetPassword
   */
  componentWillMount() {
    if (!isResetTokenValid(this.props.match.params.token)) {
      this.props.history.replace('/invalid');
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof ResetPassword
   */
  onChangeState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
    *
    *
    * @returns {null} no return
    * @param {event} event
    * @memberof ResetPassword
    */
  onSubmit(event) {
    event.preventDefault();
    this.props.resetPassword({ password: this.state.password, passwordconfirm: this.state.password2 }, this.props.match.params.token);
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof ResetPassword
   */
  render() {
    const isEnabled = this.state.password.length > 0 &&
    this.state.password === this.state.password2;

    return (
      <div className="wrapper d-flex flex-column h-100">
        <Header />
        <section
          className="align-items-center d-flex flex-column flex-grow background-img justify-content-center"
          id="reset"
        >
          <div className="col-md-6 text-center">
            <h2 className="text-white">CHANGE PASSWORD</h2>

            {this.props.alert &&
              <div className="alert alert-danger">
                {this.props.alertMessage}
              </div>}

            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangeState}
                  type="password"
                  placeholder="New Password"
                  name="password"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangeState}
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                />
              </div>
              <div className="form-group">
                <button
                  onClick={this.onSubmit}
                  disabled={!isEnabled}
                  className="btn  btn-dark btn-block border-1 text-white py-3"
                  type="submit"
                >
                  UPDATE PASSWORD
                </button>
                {this.props.loading && <Spinner />}
              </div>
            </form>
          </div>
        </section>
        <Footer />
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
      resetPassword
    },
    dispatch
  );

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);
