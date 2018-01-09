import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListGroupItem from './listGroupItem';
import { getCenters } from '../actions/center';
import { getEventsByUser } from '../actions/event';
/**
 * Handles the content display for he dashboard tab
 *
 * @class TabContent
 * @extends {Component}
 */
class TabContent extends Component {
  /**
   * Creates an instance of TabContent.
   * @param {any} props
   * @memberof TabContent
   */
  constructor(props) {
    super(props);
    this.state = {
      localeOptions: {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    };
    this.handleTab = this.handleTab.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof TabContent
   */
  componentWillMount() {
    this.handleTab(this.props);
  }
  /**
   *
   * @returns {null} no return
   * @param {any} nextProps
   * @memberof TabContent
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.tabIndex !== this.props.tabIndex) {
      this.handleTab(nextProps);
    }
  }
  /**
 *
 * @returns {null} no return
 * @param {any} prop
 * @memberof TabContent
 */
  handleTab(prop) {
    if (prop.tabIndex === 1) {
      this.props.getEvents();
    } else if (prop.tabIndex === 2) {
      this.props.getCenters();
    }
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof TabContent
   */
  render() {
    return (
      <div className="tab-content p-4">
        <div role="tabpanel" className="tab-pane active in" id="events">
          {this.props.listOfEvents.length > 0
            ?
              <div className="list-group">
                {this.props.tabIndex === 1 &&
                    this.props.listOfEvents.map(event =>
                      (<ListGroupItem
                        key={event.id}
                        details={
                          <span>
                            {new Date(event.startDate).toLocaleString(
                              'en-GB',
                              this.state.localeOptions
                            )}
                            <span>
                              {' - '}
                            </span>
                            {new Date(event.endDate).toLocaleString(
                              'en-GB',
                              this.state.localeOptions
                            )}
                          </span>
                        }
                        id={event.id}
                        name={event.name}
                        edit
                      />))}
              </div>
          : <h3 className="text-center text-white">No event available</h3>}
        </div>
        {this.props.role &&
          <div role="tabpanel" className="tab-pane fade" id="centers">
            {this.props.listOfCenters.length > 0
              ?
                <div className="list-group">
                  {this.props.tabIndex === 2 &&
                      this.props.listOfCenters.map(center =>
                        (<ListGroupItem
                          key={center.id}
                          details={
                            <span>
                              {center.location}, {center.state}
                            </span>
                          }
                          id={center.id}
                          name={center.name}
                          edit
                        />))}
                </div>
              : <h3 className="text-center text-white">No center available</h3>}
          </div>}
      </div>
    );
  }
}

TabContent.defaultValue = {
  role: false,
  tabIndex: 1
};

TabContent.propTypes = {
  role: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
  listOfCenters: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOfEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  getEvents: PropTypes.func.isRequired,
  getCenters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.event.isLoading,
  alert: state.event.error,
  alertMessage: state.event.errorMessage,
  listOfEvents: state.event.eventList,
  listOfAllEvents: state.event.allEventList,
  listOfCenters: state.center.centerList,
  listOfAllCenters: state.center.allCenterList
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCenters,
      getEvents: getEventsByUser
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(TabContent);
