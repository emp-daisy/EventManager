import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination from 'react-js-pagination';
import Footer from './footer';
import Header from './header';
import FloatingButton from './floatingButton';
import SearchBlock from './searchForm';
import Tabs from './tabs';
import TabContent from './tabContent';
import {isUserAdmin} from '../actions/authentication';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      perPage: 10,
      activeTab: 1
    }
    this.onChange = this
      .onChange
      .bind(this);
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.handleTabChange = this
      .handleTabChange
      .bind(this);
  }
  componentWillMount() {
    if (!this.props.loggedIn) {
      this
        .props
        .history
        .push('/login');
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.loggedIn) {
      this
        .props
        .history
        .push('/login');
    }
  }
  onChange() {}
  handlePageChange(pageNumber) {
    this
      .refs
      ._list
      .scrollIntoView({block: 'start', behavior: 'smooth'});
    this.setState({activePage: pageNumber});
  }
  handleTabChange(tabNumber) {
    if (tabNumber !== this.state.activeTab) {
      this.setState({activeTab: tabNumber, activePage: 1});
    }
  }
  render() {
    return (
      <div className="wrapper" id="wrapper">
        <Header/>
        <section
          className="container-fluid d-flex flex-column flex-grow background-img "
          id="dashboard">
          <div className="row align-content-center">
            <div className="col-md-8 offset-md-2">
              <div className="sticky-top">
                <div className="clearfix  w-50 ml-auto">
                  <SearchBlock onChange={this.onChange} showButton={false}/>
                </div>
                <Tabs role={isUserAdmin()} onChange={this.handleTabChange}/>
              </div>
              <div ref="_list">
                <TabContent role={isUserAdmin()} tabIndex={this.state.activeTab}/></div>
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
            onChange={this.handlePageChange}/>
          <div className="row fixed-bottom justify-content-end">
            <FloatingButton tab={this.state.activeTab}/>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {loggedIn: state.user.isLoggedIn};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
