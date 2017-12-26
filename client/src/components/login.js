import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {login} from '../actions/authentication';
import Spinner from './spinner';
import Header from './header';
import Footer from './footer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.onChangeEmail = this
      .onChangeEmail
      .bind(this);
    this.onChangePassword = this
      .onChangePassword
      .bind(this);
    this.canSubmit = this
      .canSubmit
      .bind(this);
  }
  onChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  onChangePassword(event) {
    this.setState({password: event.target.value});
  }
  onSubmit(event) {
    event.preventDefault();
    this
      .props
      .login(this.state.email, this.state.password);
  }
  canSubmit() {
    return (this.state.email.length > 0 && this.state.password.length > 0);
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
  }
  render() {
    const isEnabled = this.canSubmit();

    return (
      <div>
        <Header/>
        <section className="align-items-center full-height-80 parallex-img" id="login">
          <div className="img-overlay"/>
          <div className="col-md-6 text-center">
            <h2 className="display-4 text-white">LOGIN</h2>

            {this.props.alert && <div className="alert alert-danger">{this.props.alertMessage}</div>}

            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangeEmail}
                  type="text"
                  placeholder="Email"/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  onChange={this.onChangePassword}
                  type="password"
                  placeholder="Password"/>
              </div>
              <div className="form-check text-white">
                <input type="checkbox"/>
                Remember me
              </div>
              <div className="form-group">
                <button
                  onClick={this.onSubmit}
                  disabled={!isEnabled}
                  className="btn  btn-dark btn-block border-1 text-white py-3"
                  type="submit">LOGIN
                </button>
                {this.props.loading && <Spinner/>}
              </div>
            </form>
            <div className="text-white">
              <div>
                <p>I don't have an account?
                  <Link to="/register">
                    Click here</Link>
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
  return {loading: state.user.isLoading, loggedIn: state.user.isLoggedIn, alert: state.user.error, alertMessage: state.user.errorMessage};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
