import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Footer from './footer';
import HeaderBlock from './header';
import SearchBlock from './searchForm';
import { isUserAdmin } from '../actions/authentication';
import {
  updateEvent,
  deleteEvent,
  getEventsByUser,
  filterEventsBy
} from '../actions/event';
import { createCenter, getCentersOptions } from '../actions/center';
import getStates from '../actions/states';
import CenterModal from './centerFormModal';
import EventModal from './eventFormModal';
import ConfirmDelete from './confirmAlert';
/**
 *
 *
 * @class Dashboard
 * @extends {Component}
 */
export class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searching: false,
      activePage: 1,
      perPage: 10,
      showModal: false,
      modalAction: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchReset = this.onSearchReset.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.history.push('/login');
    } else {
      this.props.getEventsByUser();
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} nextProps
   * @param {any} nextState
   * @memberof Dashboard
   */
  componentWillUpdate(nextProps) {
    if (!nextProps.loggedIn) {
      this.props.history.push('/login');
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof Dashboard
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @returns {null}  reset search action
   * @memberof Dashboard
   */
  onSearchReset() {
    this.setState({ searching: false, searchText: '' });
    this.props.getEventsByUser();
  }
  /**
   *
   * @returns {null} search action
   * @memberof Dashboard
   */
  onSearch() {
    this.setState({ searching: true });
    this.props.filterEventsBy(this.state.searchText);
  }
  /**
   *
   * @returns {null} no return
   * @param {any} pageNumber
   * @memberof Dashboard
   */
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      // this.handlePageItems();
    });
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  handleCreate() {
    this.setState({ showModal: true, modalAction: 'create' });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @param {any} data
   * @param {any} tabIndex
   * @memberof Dashboard
   */
  handleDelete(data) {
    this.setState({
      showModal: true,
      activeModalData: data,
      modalAction: 'delete'
    });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @param {any} data
   * @param {any} tabIndex
   * @memberof Dashboard
   */
  handleEdit(data) {
    this.setState({
      showModal: true,
      activeModalData: data,
      modalAction: 'edit'
    });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  handleClose() {
    this.setState({ showModal: false });
    document.body.classList.remove('modal-open');
  }
  /**
   *
   *
   * @returns {element} HTML element
   * @memberof Dashboard
   */
  render() {
    return (
      <div className="wrapper" id="wrapper">
        <HeaderBlock />
        <section
          className="container-fluid d-flex flex-column flex-grow background-img "
          id="dashboard"
        >
          <div className="row align-content-center">
            <div className="col-md-8 offset-md-2">
              <div className="row my-3 align-items-center ">
                {isUserAdmin() && (
                  <div className="col-md-6">
                    <button
                      className="btn btn-dark border-1 text-white py-3"
                      onClick={() => this.handleCreate()}
                    >
                      New Center
                    </button>
                  </div>
                )}
                <div className="col-md-6">
                  {(this.props.listOfEvents.centers.length > 0 ||
                    this.state.searching) && (
                    <SearchBlock
                      onChange={this.onChange}
                      onFilter={this.onSearch}
                      onReset={this.onSearchReset}
                      disabled={this.state.searchText === ''}
                      hideReset={this.state.searching}
                    />
                  )}
                </div>
              </div>
              <div>
                {this.props.listOfEvents.centers.map(event => (
                  <div
                    key={event.id}
                    className="list-group-item mb-2 bg-color flex-column align-items-start text-white"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{event.name}</h5>
                    </div>
                    <p className="mb-1">
                      {`${moment(event.startDate).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(event.endDate).format('MMMM Do YYYY, h:mm:ss a')}`}
                    </p>
                    <div className="d-flex w-100 justify-content-end p-2">
                      <div>
                        <button
                          type="button"
                          className="mx-2 btn btn-sm"
                          onClick={() => this.handleEdit(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="mx-2 btn btn-sm btn-secondary"
                          onClick={() => this.handleDelete(event)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Pagination
            hideDisabled
            className="justify-content-center"
            linkClass="page-link"
            itemClass="page-item"
            innerClass="pagination justify-content-center m-4"
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.perPage}
            totalItemsCount={this.props.listOfEvents.length}
            onChange={this.handlePageChange}
          />
        </section>
        <Footer />
        {this.state.showModal && (
          <div className="overlayModal">
            {this.state.modalAction === 'delete' && (
              <ConfirmDelete
                name={this.state.activeModalData.name}
                onConfirm={() => {
                  this.props
                    .deleteEvent(this.state.activeModalData.id)
                    .then(() => {
                      this.props.getEventsByUser();
                    });
                }}
                onCancel={this.handleClose}
              />
            )}
            {this.state.modalAction === 'edit' && (
              <EventModal
                isCreate={false}
                onClose={this.handleClose}
                prevData={this.state.activeModalData}
                handleSubmit={
                  this.props.updateEvent
                }
                allCenters={this.props.getCentersOptions}
              />
            )}
            {this.state.modalAction === 'create' && (
              <CenterModal
                isCreate
                onClose={this.handleClose}
                allStates={this.props.getStates}
                handleSubmit={this.props.createCenter}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.isLoggedIn,
  listOfEvents: state.event.eventList
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStates,
      createCenter,
      getCentersOptions,
      updateEvent,
      deleteEvent,
      getEventsByUser,
      filterEventsBy
    },
    dispatch
  );

Dashboard.propTypes = {
  createCenter: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  filterEventsBy: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  getEventsByUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  listOfEvents: PropTypes.objectOf(PropTypes.any).isRequired,
  getStates: PropTypes.func.isRequired,
  getCentersOptions: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Dashboard);
