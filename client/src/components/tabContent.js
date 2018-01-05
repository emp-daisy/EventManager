import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListGroupItem from './listGroupItem';
import {getCenters} from '../actions/center';
import {getEventsByUser} from '../actions/event';

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.handleTab = this
      .handleTab
      .bind(this);
  }
  componentWillMount() {
    this.handleTab(this.props);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.tabIndex !== this.props.tabIndex) {
      this.handleTab(nextProps);
    }
  }
  handleTab(prop) {
    if (prop.tabIndex === 1) {
      this
        .props
        .getEvents();
    } else if (prop.tabIndex === 2) {
      this
        .props
        .getCenters();
    }
  }
  render() {
    return (
      <div className="tab-content p-4">
        <div role="tabpanel" className="tab-pane active in" id="events">
          {this.props.listOfEvents.length > 0
            ? <div className="list-group">
                {this.props.tabIndex === 1 && this
                  .props
                  .listOfEvents
                  .map((event, index) => (<ListGroupItem
                    key={index}
                    details={(
                    <span>{new Date(event.startDate).toLocaleString('en-GB', this.state.localeOptions)}
                      <span>
                        {' - '}
                      </span>
                      {new Date(event.endDate).toLocaleString('en-GB', this.state.localeOptions)}</span>
                  )}
                    id={event.id}
                    name={event.name}
                    edit={true}/>))
}
              </div>
            : <h3 className="text-center text-white">No event available</h3>}
        </div>
        {this.props.role && <div role="tabpanel" className="tab-pane fade" id="centers">
          {this.props.listOfCenters.length > 0
            ? <div className="list-group">
                {this.props.tabIndex === 2 && this
                  .props
                  .listOfCenters
                  .map((center, index) => (<ListGroupItem
                    key={index}
                    details={(
                    <span>{center.location}, {center.state}</span>
                  )}
                    id={center.id}
                    name={center.name}
                    edit={true}/>))
}
              </div>
            : <h3 className="text-center text-white">No center available</h3>}

        </div>
}
      </div>
    );
  }
}

TabContent.defaultValue = {
  role: false,
  tabIndex: 1
}

TabContent.propTypes = {
  role: PropTypes.bool.isRequired,
  tabIndex: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  return {
    loading: state.event.isLoading,
    alert: state.event.error,
    alertMessage: state.event.errorMessage,
    listOfEvents: state.event.eventList,
    listOfAllEvents: state.event.allEventList,
    listOfCenters: state.center.centerList,
    listOfAllCenters: state.center.allCenterList
  };
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCenters: getCenters,
    getEvents: getEventsByUser
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TabContent);
