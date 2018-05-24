import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
    this.state = {
      activeStyle: 'nav-item active',
      linkStyle: 'nav-item'
    };
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
    const path = window.location.pathname;
    return (
      <nav className="navbar navbar-expand-md navbar-dark">
        <a href="/" className="navbar-brand display-1 font-weight-bold">
          Event Manager
        </a>
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
            <li
              className={
                path === '/' ? this.state.activeStyle : this.state.linkStyle
              }
            >
              <a href="/" className="nav-item nav-link">
                Home
              </a>
            </li>
            <li
              className={
                path.includes('events')
                  ? this.state.activeStyle
                  : this.state.linkStyle
              }
            >
              <a href="/events" className="nav-item nav-link">
                Events
              </a>
            </li>
            {this.props.loggedIn &&
              <li
                className={
                  path.includes('dashboard')
                    ? this.state.activeStyle
                    : this.state.linkStyle
                }
              >
                <a href="/dashboard" className="nav-item nav-link">
                  Dashboard
                </a>
              </li>}
            {!this.props.loggedIn &&
              !path.includes('login') &&
              <li className="nav-item">
                <a href="/login" className="nav-item nav-link">
                  Login
                </a>
              </li>}
            {!this.props.loggedIn &&
              !path.includes('register') &&
              <li className="nav-item">
                <a href="/register" className="nav-item nav-link">
                  Register
                </a>
              </li>}
            {this.props.loggedIn &&
              <li className="nav-item">
                <a href="/" onClick={this.onLogOut} className="nav-item nav-link">
                  Log out
                </a>
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

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Header);
