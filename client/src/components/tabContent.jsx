import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import ListGroupItem from './listGroupItem';
import { getCenters, updateCenter, deleteCenter, getCentersOptions } from '../actions/center';
import CenterModal from './centerFormModal';
import EventModal from './eventFormModal';
import ConfirmDelete from './confirmAlert';
import getStates from '../actions/states';
import { getEventsByUser, deleteEvent, updateEvent } from '../actions/event';
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
      showModal: false,
      activeModal: 1,
      activeModalData: {},
      modalAction: ''
    };
    this.handleTab = this.handleTab.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
   * @returns {null} no return
   * @param {any} data
   * @param {any} tabIndex
   * @memberof TabContent
   */
  handleDelete(data, tabIndex) {
    this.setState({
      showModal: true, activeModal: tabIndex, activeModalData: data, modalAction: 'delete'
    });
  }
  /**
   *
   * @returns {null} no return
   * @param {any} data
   * @param {any} tabIndex
   * @memberof TabContent
   */
  handleEdit(data, tabIndex) {
    this.setState({
      showModal: true, activeModal: tabIndex, activeModalData: data, modalAction: 'edit'
    });
  }
  /**
   *
   * @returns {null} no return
   * @memberof TabContent
   */
  handleClose() {
    this.setState({ showModal: false });
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
                          <span>{moment(event.startDate).format('MMMM Do YYYY, h:mm:ss a')}
                            <span>
                              {' - '}
                            </span>
                            {moment(event.endDate).format('MMMM Do YYYY, h:mm:ss a')}
                          </span>
                        }
                        id={event.id}
                        name={event.name}
                        onDelete={() => this.handleDelete(event, 1)}
                        onEdit={() => this.handleEdit(event, 1)}
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
                          onDelete={() => this.handleDelete(center, 2)}
                          onEdit={() => this.handleEdit(center, 2)}
                          edit
                        />))}
                </div>
              : <h3 className="text-center text-white">No center available</h3>}
          </div>}

        {this.state.showModal &&
          <div className="overlayModal">
            {this.state.modalAction === 'delete' &&
              <ConfirmDelete
                name={this.state.activeModalData.name}
                onConfirm={this.state.activeModal === 1
                ? () => this.props.deleteEvent(this.state.activeModalData.id) :
                () => this.props.deleteCenter(this.state.activeModalData.id)}
                onCancel={this.handleClose}
              />
            }
            {(this.state.activeModal === 2 && this.state.modalAction !== 'delete') &&
              <CenterModal
                isCreate={false}
                handleSubmit={this.props.updateCenter}
                onClose={this.handleClose}
                allStates={this.props.getStates}
                prevData={this.state.activeModalData}
              />
            }
            {(this.state.activeModal === 1 && this.state.modalAction !== 'delete') &&
            <EventModal
              isCreate={false}
              onClose={this.handleClose}
              prevData={this.state.activeModalData}
              handleSubmit={this.props.updateEvent}
              allCenters={this.props.getCentersOptions}
            />
            }
          </div>
        }
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
  getCenters: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteCenter: PropTypes.func.isRequired,
  updateCenter: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  getCentersOptions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.event.isLoading,
  alert: state.event.error,
  alertMessage: state.event.errorMessage,
  listOfEvents: state.event.pageItems,
  listOfAllEvents: state.event.allEventList,
  listOfCenters: state.center.pageItems,
  listOfAllCenters: state.center.allCenterList
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCenters,
      getEvents: getEventsByUser,
      deleteEvent,
      getStates,
      updateEvent,
      deleteCenter,
      updateCenter,
      getCentersOptions
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(TabContent);
