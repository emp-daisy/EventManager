import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { logOut } from '../actions/authentication';
/**
 *
 *
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
  /**
   * Creates an instance of Header.
   * @param {any} props
   * @memberof Header
   */
  constructor(props) {
    super(props);
    this.onLogOut = this.onLogOut.bind(this);
  }
  /**
   *
   * @return {null} no return
   * @memberof Header
   */
  onLogOut() {
    this.props.logOut();
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof Header
   */
  render() {
    const path = this.props.location;
    return (
      <nav className="navbar navbar-expand-md navbar-dark text-center">
        <NavLink to="/" className="navbar-brand display-1 font-weight-bold">
          Event Manager
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-content"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-content">

          <ul className="navbar-nav ml-auto">
            <li >
              <NavLink to="/" exact className="nav-item nav-link">
                Home
              </NavLink>
            </li>
            <li >
              <NavLink to="/centers" className="nav-item nav-link">
                Centers
              </NavLink>
            </li>
            {this.props.loggedIn &&
              <li >
                <NavLink to="/dashboard" className="nav-item nav-link">
                  Dashboard
                </NavLink>
              </li>}
            {(!this.props.loggedIn &&
              path !== '/login') &&
              <li className="nav-item">
                <NavLink to="/login" className="nav-item nav-link">
                  Login
                </NavLink>
              </li>}
            {(!this.props.loggedIn &&
              !path !== '/register') &&
              <li className="nav-item">
                <NavLink to="/register" className="nav-item nav-link">
                  Register
                </NavLink>
              </li>}
            {this.props.loggedIn &&
              <li className="nav-item">
                <NavLink to="/" onClick={this.onLogOut} className="nav-item nav-link">
                  Log out
                </NavLink>
              </li>}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({ loggedIn: state.user.isLoggedIn });
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut
    },
    dispatch
  );

Header.defaultProps = {
  logOut: () => {},
  // loggedIn: false,
  location: ''
};
Header.propTypes = {
  logOut: PropTypes.func,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.string
};
export default connect(mapStateToProps, matchDispatchToProps)(Header);
