import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 *
 *
 * @class Tabs
 * @extends {Component}
 */
class Tabs extends Component {
  /**
 * Creates an instance of Tabs.
 * @param {any} props
 * @memberof Tabs
 */
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
  }
  /**
 *
 *
 * @param {any} event
 * @returns {boolean} true value for onclick
 * @memberof Tabs
 */
  handleTabChange(event) {
    this.props.onChange(+event.target.dataset.id);
    return true;
  }
  /**
 *
 *
 * @returns {element} HTML code
 * @memberof Tabs
 */
  render() {
    return (
      <ul className="nav nav-tabs nav-fill user-tabs" id="user-tab">
        <li className="nav-item">
          <a
            onClick={this.handleTabChange}
            className="nav-link active tab-custom"
            href="#events"
            data-toggle="tab"
            data-id={1}
          >
            EVENTS
          </a>
        </li>
        {this.props.role &&
          <li className="nav-item">
            <a
              onClick={this.handleTabChange}
              className="nav-link tab-custom"
              href="#centers"
              data-toggle="tab"
              data-id={2}
            >
              CENTERS
            </a>
          </li>}
      </ul>
    );
  }
}

Tabs.defaultValue = {
  role: false,
  onChange: () => true
};

Tabs.propTypes = {
  role: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Tabs;
