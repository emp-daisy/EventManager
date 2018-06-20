import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import { register } from '../actions/authentication';
import Spinner from './spinner';
import HeaderBlock from './header';
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
      passwordconfirm: '',
      errors: {
        firstname: { isInvalid: false, message: '' },
        surname: { isInvalid: false, message: '' },
        email: { isInvalid: false, message: '' },
        password: { isInvalid: false, message: '' },
        passwordconfirm: { isInvalid: false, message: '' }
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.resetValidation = this.resetValidation.bind(this);
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
    this.resetValidation();
    if (!this.isFormInvalid()) {
      const value = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        passwordconfirm: this.state.passwordconfirm
      };
      this.props.register(value);
    }
  }
  /**
   *
   *
   * @returns {boolean} if form field is filled
   * @memberof Register
   */
  canSubmit() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.passwordconfirm.length > 0 &&
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0
    );
  }
  /**
   *
   *
   * @returns {boolean} if form field is valid
   * @memberof Register
   */
  isFormInvalid() {
    const { errors } = this.state;

    if (!validator.isEmail(this.state.email)) {
      errors.email.isInvalid = true;
      errors.email.message = 'Invalid email address';
    }
    if (!validator.isLength(this.state.firstname, { min: 3, max: undefined })) {
      errors.firstname.isInvalid = true;
      errors.firstname.message = 'First name should be more than 3 characters';
    }
    if (!validator.isLength(this.state.lastname, { min: 3, max: undefined })) {
      errors.surname.isInvalid = true;
      errors.surname.message = 'Surname should be more than 3 characters';
    }
    if (!validator.isLength(this.state.password, { min: 6, max: undefined })) {
      errors.password.isInvalid = true;
      errors.password.message = 'Password must contain 6 or more characters';
    } else if (
      !validator.equals(this.state.password, this.state.passwordconfirm)
    ) {
      errors.password.isInvalid = true;
      errors.passwordconfirm.isInvalid = true;
      errors.password.message = 'Password does not match';
      errors.passwordconfirm.message = 'Password does not match';
    }
    this.setState({ errors });
    return Object.keys(errors).some(value => errors[value].isInvalid);
  }
  /**
   *
   *
   * @returns {null} Reset form errors
   * @memberof Register
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
   * @memberof Register
   */
  render() {
    const isEnabled = this.canSubmit();
    return (
      <div className="inner-wrapper d-flex flex-column h-100">
        <HeaderBlock />
        <section
          className={'align-items-center flex-grow d-flex flex-column ' +
                    'flex-grow background-img justify-content-center'}
          id="register"
        >
          <div className="col-md-6 col-12 text-center align-items-center">
            <h2 className="text-white text-center">REGISTER</h2>
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
                {this.state.errors.firstname.isInvalid &&
                  <span className="error">
                    {this.state.errors.firstname.message}
                  </span>}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  onChange={this.onChangeState}
                  placeholder="Surname"
                />
                {this.state.errors.surname.isInvalid &&
                  <span className="error">
                    {this.state.errors.surname.message}
                  </span>}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  onChange={this.onChangeState}
                  name="email"
                  placeholder="Email"
                />
                {this.state.errors.email.isInvalid &&
                  <span className="error">
                    {this.state.errors.email.message}
                  </span>}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  onChange={this.onChangeState}
                  name="password"
                  placeholder="Password"
                />
                {this.state.errors.password.isInvalid &&
                  <span className="error">
                    {this.state.errors.password.message}
                  </span>}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="passwordconfirm"
                  onChange={this.onChangeState}
                  placeholder="Confirm Password"
                />
                {this.state.errors.passwordconfirm.isInvalid &&
                  <span className="error">
                    {this.state.errors.passwordconfirm.message}
                  </span>}
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
                  {'I have an account? '}
                  <a className="span-link" href="/login">
                    Click here
                  </a>
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
  success: state.user.success,
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
  success: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  counter: PropTypes.number.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Register);
