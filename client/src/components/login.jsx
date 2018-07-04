import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import isEmail from 'validator/lib/isEmail';
import { login, clearNotification } from '../actions/authentication';
import Spinner from './spinner';
import HeaderBlock from './header';
import Footer from './footer';
import ConnectedForgottenPassword from './forgotPasswordModal';
/**
 *
 *
 * @class Login
 * @extends {Component}
 */
export class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: { email: false },
      showModal: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof Login
   */
  componentWillMount() {
    this.props.clearNotification();
    if (this.props.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} nextProps
   * @memberof Login
   */
  componentWillUpdate(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof Login
   */
  onChangeState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   *
   * @returns {null} hide reset modal
   * @memberof Login
   */
  onCancel() {
    this.setState({ showModal: false });
  }
  /**
   *
   *
   * @returns {boolean} show reset modal and avoid navigation
   * @memberof Login
   */
  onShowModal() {
    this.setState({ showModal: true });
    return false;
  }
  /**
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof Login
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors } = this.state;

    errors.email = !isEmail(this.state.email);

    this.setState({ errors }, () => {
      if (!this.state.errors.email) {
        this.props.login(this.state.email, this.state.password);
      }
    });
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof Login
   */
  render() {
    const isEnabled =
      this.state.email.length > 0 && this.state.password.length > 0;

    return (
      <div className="inner-wrapper d-flex flex-column h-100">
        <HeaderBlock />
        <section
          className={'align-items-center d-flex flex-column ' +
                  'flex-grow background-img justify-content-center'}
          id="login"
        >
          <div className="col-md-6 text-center">
            <h2 className="text-white">LOGIN</h2>

            {this.props.alert &&
              <div className="alert alert-danger">
                {this.props.alertMessage}
              </div>}

            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangeState}
                  type="text"
                  placeholder="Email"
                  name="email"
                />
                {this.state.errors.email &&
                  <span className="error">Invalid email address</span>}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangeState}
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="form-group">
                <button
                  onClick={this.onSubmit}
                  disabled={!isEnabled}
                  className="btn  btn-dark btn-block border-1 text-white py-3"
                  type="submit"
                >
                  LOGIN
                </button>
                {this.props.loading && <Spinner />}
              </div>
            </form>
            <div className="text-white">
              <div>
                <p>
                  {'Forgotten password? '}
                  <span
                    className="span-link"
                    role="button"
                    tabIndex="0"
                    onKeyPress={this.onShowModal}
                    onClick={this.onShowModal}
                  >
                    Click here
                  </span>
                </p>
                <p>
                  {"I don't have an account? "}
                  <a className="span-link" href="/register">
                    Click here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        {this.state.showModal &&
          <div className="overlayModal">
            <ConnectedForgottenPassword onCancel={this.onCancel} />
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.isLoading,
  loggedIn: state.user.isLoggedIn,
  alert: state.user.error,
  alertMessage: state.user.errorMessage
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      clearNotification
    },
    dispatch
  );

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Login);
