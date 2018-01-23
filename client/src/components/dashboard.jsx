import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Footer from './footer';
import Header from './header';
import SearchBlock from './searchForm';
import Tabs from './tabs';
import TabContent from './tabContent';
import { isUserAdmin } from '../actions/authentication';
import { createEvent } from '../actions/event';
import { createCenter, getCentersOptions } from '../actions/center';
import getStates from '../actions/states';
import CenterModal from './centerFormModal';
import EventModal from './eventFormModal';
/**
 *
 *
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      perPage: 10,
      activeTab: 1,
      showModal: false,
      modalAction: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.history.push('/login');
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} nextProps
   * @param {any} nextState
   * @memberof Dashboard
   */
  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.loggedIn) {
      this.props.history.push('/login');
    }
    if (nextState.searchText !== this.state.searchText) {
      this.handlePageChange(1);
      // this.props.filterEventsBy(nextState.searchText, this.props.listOfAllEvents);
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
   * @returns {null} no return
   * @param {any} pageNumber
   * @memberof Dashboard
   */
  handlePageChange(pageNumber) {
    this.tabList.scrollIntoView({ block: 'start', behavior: 'smooth' });
    this.setState({ activePage: pageNumber });
  }
  /**
   *
   * @returns {null} no return
   * @param {any} tabNumber
   * @memberof Dashboard
   */
  handleTabChange(tabNumber) {
    if (tabNumber !== this.state.activeTab) {
      this.setState({ activeTab: tabNumber, activePage: 1 });
    }
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  handleCreate() {
    this.setState({ showModal: true, modalAction: 'create' });
  }
  /**
   *
   * @returns {null} no return
   * @memberof Dashboard
   */
  handleClose() {
    this.setState({ showModal: false });
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
        <Header />
        <section
          className="container-fluid d-flex flex-column flex-grow background-img "
          id="dashboard"
        >
          <div className="row align-content-center">
            <div className="col-md-8 offset-md-2">
              <div className="sticky-top">
                <div className="clearfix  w-50 ml-auto">
                  <SearchBlock onChange={this.onSearchChange} showButton={false} />
                </div>
                <Tabs role={isUserAdmin()} onChange={this.handleTabChange} />
              </div>
              <div ref={(e) => { this.tabList = e; }}>
                <TabContent
                  role={isUserAdmin()}
                  tabIndex={this.state.activeTab}
                />
                <button
                  type="button"
                  className="btn btn-dark btn-circle-float position-fixed bottom-20"
                  onClick={this.handleCreate}
                  title={this.state.activeTab === 1 ? 'New event' : 'New Center'}
                  style={{ right: 0, bottom: '10vh' }}
                >
                  <i className="fa fa-plus" />
                </button>
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
            totalItemsCount={50}
            onChange={this.handlePageChange}
          />
        </section>
        <Footer />
        {this.state.showModal &&
          <div className="overlayModal">
            {(this.state.activeTab === 1 && this.state.modalAction === 'create') &&
            <EventModal
              isCreate
              onClose={this.handleClose}
              handleSubmit={this.props.createEvent}
              allCenters={this.props.getCentersOptions}
            />
            }
            {(this.state.activeTab === 2 && this.state.modalAction === 'create') &&
              <CenterModal
                isCreate
                onClose={this.handleClose}
                allStates={this.props.getStates}
                handleSubmit={this.props.createCenter}
              />
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.user.isLoggedIn });
const matchDispatchToProps = dispatch => bindActionCreators({
  createEvent,
  getStates,
  createCenter,
  getCentersOptions
}, dispatch);

Dashboard.propTypes = {
  createCenter: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getStates: PropTypes.func.isRequired,
  getCentersOptions: PropTypes.func.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
