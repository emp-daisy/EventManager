import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { register } from '../actions/authentication';
import Spinner from './spinner';
import Header from './header';
import Footer from './footer';
/**
 *
 *
 * @class Register
 * @extends {Component}
 */
class Register extends Component {
  /**
   * Creates an instance of Register.
   * @param {any} props
   * @memberof Register
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordconfirm: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof Register
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
   * @memberof Register
   */
  componentWillUpdate(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/dashboard');
    }
    if (this.props.success) {
      this.form.reset();
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof Register
   */
  onChangeState(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof Register
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.register(this.state);
  }
  /**
   *
   *
   * @returns {boolean} if form field is filled
   * @memberof Register
   */
  canSubmit() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof Register
   */
  render() {
    const isEnabled = this.canSubmit();
    return (
      <div className="wrapper d-flex flex-column h-100">
        <Header />
        <section
          className="align-items-center d-flex flex-column flex-grow background-img"
          id="register"
        >
          <div className="col-md-6 col-12 text-center align-items-center">
            <h2 className="text-white text-center">REGISTER</h2>
            {this.props.alert &&
              <div className="alert alert-danger">
                {this.props.alertMessage}
              </div>}
            {this.props.success &&
              <div className="alert alert-success">
                {this.props.successMessage}
              </div>}
            {this.props.success &&
              <div className="alert alert-info">
                Redirecting in {this.props.counter}&nbsp;second{this.props.counter > 1 && 's'}...
              </div>}
            <form
              ref={(e) => {
                this.form = e;
              }}
            >
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  onChange={this.onChangeState}
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  onChange={this.onChangeState}
                  placeholder="Surname"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  onChange={this.onChangeState}
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  onChange={this.onChangeState}
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="passwordconfirm"
                  onChange={this.onChangeState}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-dark btn-block border-1 text-white py-3"
                  onClick={this.onSubmit}
                  disabled={!isEnabled}
                  type="submit"
                >
                  REGISTER
                </button>
                {this.props.loading && <Spinner />}
              </div>
            </form>

            <div className="text-white">
              <div>
                <p>
                  I have an account?
                  <a href="/login">Click here</a>
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
  alertMessage: state.user.errorMessage,
  success: state.user.success,
  successMessage: state.user.successMessage,
  counter: state.user.countDown
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register
    },
    dispatch
  );

Register.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Register);
