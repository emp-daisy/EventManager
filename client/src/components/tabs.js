import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      perPage: 10
    }
    this.handleTabChange = this
      .handleTabChange
      .bind(this);
  }
  handleTabChange(event) {
    this
      .props
      .onChange(event.target.dataset.id);
    return true;
  }
  render() {
    return (
      <ul className="nav nav-tabs nav-fill user-tabs" id="user-tab">
        <li className="nav-item">
          <a
            onClick={this.handleTabChange}
            className="nav-link active tab-custom"
            href="#events"
            data-toggle="tab"
            data-id={1}>EVENTS
          </a>
        </li>{this.props.role && <li className="nav-item">
          <a
            onClick={this.handleTabChange}
            className="nav-link tab-custom"
            href="#centers"
            data-toggle="tab"
            data-id={2}>CENTERS
          </a>
        </li>}
      </ul>
    );
  }
}

Tabs.defaultValue = {
  role: false,
  onChange: () => {
    return true
  }
}

Tabs.propTypes = {
  role: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Tabs;
