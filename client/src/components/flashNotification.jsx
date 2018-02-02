import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationSystem from 'react-notification-system';
import { addNotification } from '../actions/notify';
/**
 *
 *
 * @class Notification
 * @extends {Component}
 */
class Notification extends Component {
  /**
   *
   * @returns {null} no return
   * @param {any} newProps
   * @memberof Notification
   */
  componentWillReceiveProps(newProps) {
    if (newProps.notification.clear) {
      this.notificationSystem.clearNotifications();
    } else if (newProps.notification.config) {
      this.notificationSystem.addNotification(newProps.notification.config);
    }
  }

  /**
   *
   * @returns {null} HTML element
   * @memberof Notification
   */
  render() {
    return (
      <NotificationSystem allowHTML ref={(e) => { this.notificationSystem = e; }} />
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notify
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addNotification
  }, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
