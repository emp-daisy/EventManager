import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { login } from '../actions/authentication';
import Spinner from './spinner';
import Header from './header';
import Footer from './footer';
/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof Login
   */
  componentWillMount() {
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
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof Login
   */
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  /**
   *
   * @param {any} event
   * @returns {null} no return
   * @memberof Login
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
  /**
   *
   *
   * @returns {boolean} checks if fields are empty
   * @memberof Login
   */
  canSubmit() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof Login
   */
  render() {
    const isEnabled = this.canSubmit();

    return (
      <div className="wrapper d-flex flex-column h-100">
        <Header />
        <section
          className="align-items-center d-flex flex-column flex-grow background-img"
          id="login"
        >
          <div className="img-overlay" />
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
                  onChange={this.onChangeEmail}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-check text-white">
                <input type="checkbox" />
                Remember me
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
                  {"I don't have an account?"}
                  <a href="/register">Click here</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
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
      login
    },
    dispatch
  );

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Login);
