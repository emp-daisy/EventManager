import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {logOut} from '../actions/authentication';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '',
      activeStyle: 'nav-item active',
      linkStyle: 'nav-item'
    };
    this.onLogOut = this
      .onLogOut
      .bind(this);
  }
  onLogOut() {
    this
      .props
      .logOut();
  }
  render() {
    const path = window.location.pathname;
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <Link to="/" className="navbar-brand display-1 font-weight-bold">Event Manager</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-content"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbar-content">
          <ul className="navbar-nav ml-auto">
            <li
              className={path === '/'
              ? this.state.activeStyle
              : this.state.linkStyle}>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li
              className={path.includes('events')
              ? this.state.activeStyle
              : this.state.linkStyle}>
              <Link to="/events" className="nav-link">Events</Link>
            </li>
            {this.props.loggedIn && <li
              className={path.includes('dashboard')
              ? this.state.activeStyle
              : this.state.linkStyle}>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>}
            {(!this.props.loggedIn && !path.includes('login')) && <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>}
            {(!this.props.loggedIn && !path.includes('register')) && <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>}
            {this.props.loggedIn && <li className="nav-item">
              <Link to="/" onClick={this.onLogOut} className="nav-link">Log out</Link>
            </li>}
          </ul>
        </div>
      </nav>
    );
  }
};
const mapStateToProps = (state) => {
  return {loggedIn: state.user.isLoggedIn};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logOut: logOut
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);
