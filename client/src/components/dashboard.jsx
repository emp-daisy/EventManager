import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import Footer from './footer';
import Header from './header';
import FloatingButton from './floatingButton';
import SearchBlock from './searchForm';
import Tabs from './tabs';
import TabContent from './tabContent';
import { isUserAdmin } from '../actions/authentication';
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
      activeTab: 1
    };
    this.onChange = this.onChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
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
          <div className="row fixed-bottom justify-content-end">
            <FloatingButton tab={this.state.activeTab} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.user.isLoggedIn });
const matchDispatchToProps = dispatch => bindActionCreators({}, dispatch);

Dashboard.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.func.isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
