import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {register} from '../actions/authentication';
import Spinner from './spinner';
import Header from './header';
import Footer from './footer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordconfirm: ''
    }
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.onChangeState = this
      .onChangeState
      .bind(this);
    this.canSubmit = this
      .canSubmit
      .bind(this);
  }
  componentWillMount() {
    if (this.props.loggedIn) {
      this
        .props
        .history
        .push('/dashboard');
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.loggedIn) {
      this
        .props
        .history
        .push('/dashboard');
    }
    if (this.props.success) {
      this
        .refs
        .form
        .reset();
    }
  }
  onChangeState(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  canSubmit() {
    return (this.state.email.length > 0 && this.state.password.length > 0);
  }
  onSubmit(event) {
    event.preventDefault();
    this
      .props
      .register(this.state);
  }
  render() {
    const isEnabled = this.canSubmit();
    return (
      <div>
        <Header/>
        <section
          className="align-items-center full-height-80 parallex-img"
          id="register">
          <div className="img-overlay"/>
          <div className="col-md-6 col-12 text-center align-items-center">
            <h2 className="text-white text-center">REGISTER</h2>
            {this.props.alert && <div className="alert alert-danger">{this.props.alertMessage}</div>}
            {this.props.success && <div className="alert alert-success">{this.props.successMessage}</div>}
            {this.props.success && <div className="alert alert-info">
              Redirecting in {this.props.counter}&nbsp;second{this.props.counter > 1 && 's'}...</div>}
            <form ref='form'>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  onChange={this.onChangeState}
                  placeholder="First Name"/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  onChange={this.onChangeState}
                  placeholder="Surname"/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  onChange={this.onChangeState}
                  name="email"
                  placeholder="Email"/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  onChange={this.onChangeState}
                  name="password"
                  placeholder="Password"/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="passwordconfirm"
                  onChange={this.onChangeState}
                  placeholder="Confirm Password"/>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-dark btn-block border-1 text-white py-3"
                  onClick={this.onSubmit}
                  disabled={!isEnabled}
                  type="submit">REGISTER
                </button>
                {this.props.loading && <Spinner/>}
              </div>
            </form>

            <div className="text-white">
              <div>
                <p>I have an account?
                  <Link to="/login">Click here</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.isLoading,
    loggedIn: state.user.isLoggedIn,
    alert: state.user.error,
    alertMessage: state.user.errorMessage,
    success: state.user.success,
    successMessage: state.user.successMessage,
    counter: state.user.countDown
  };
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    register: register
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);
