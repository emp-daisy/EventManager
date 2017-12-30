import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import Header from './header';
import Footer from './footer';
import Pagination from 'react-js-pagination';
import Spinner from './spinner';
import CardBlock from './cards';
import {getCenters, filterBy} from '../actions/center';
import SearchBlock from './searchForm';
import ListEvents from './listEventModal';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      searchText: '',
      selectOption: 'all',
      perPage: 10
    };
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.handleModal = this
      .handleModal
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.onFilterSearch = this
      .onFilterSearch
      .bind(this);
  }

  componentWillMount() {
    this
      .props
      .getCenters();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  handleModal(event) {
    $.noConflict();
    $(ReactDOM.findDOMNode(this.refs.eventModal)).show();
  }

  onFilterSearch(event) {
    event.preventDefault();
    this
      .props
      .filterBy(this.state.selectOption, this.state.searchText, this.props.listOfAllCenters);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (this.state.searchText.length === 1) {
      this
        .props
        .getCenters();
    } else {
      this
        .props
        .filterBy(this.state.selectOption, this.state.searchText, this.props.listOfAllCenters);
    }
  }

  render() {
    const isEnabled = this.state.searchText.length > 0;
    const {activePage, perPage} = this.state;
    const {listOfCenters} = this.props;
    // Logic for displaying pages
    const indexOfLastItems = activePage * perPage;
    const indexOfFirstItems = indexOfLastItems - perPage;
    const pageItems = listOfCenters.slice(indexOfFirstItems, indexOfLastItems);

    return (
      <div className="wrapper">
        <Header/>
        <section className="container-fluid full-height-80 background-img" id="event">
          <h2 className="mx-5 font-weight-bold text-white">Available Centers</h2>
          <div className="row text-center m-4 justify-content-center">
            <div className="col-md-6 col-sm-12 offset-md-6">
              <SearchBlock
                onChange={this.onChange}
                onFilter={this.onFilterSearch}
                disabled={!isEnabled}
                dropDownArray={['All', 'Name', 'Location', 'Facilities']}/>
            </div>
          </div>
          {this.props.alert && <div className="alert alert-danger">{this.props.alertMessage}</div>}
          {this.props.loading && <Spinner/>}
          {(pageItems.length === 0 && !this.props.alert) && <h3 className="text-white">No center found</h3>}

          {pageItems.length > 0 && <div>
            <div className="row align-items-center m-4 justify-content-center">
              {pageItems.map(center => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={center.id}>
                  <CardBlock
                    id={center.id}
                    src={center.image
                    ? center.image
                    : undefined}
                    title={center.name}
                    onClick={this.handleModal}
                    buttonText="Check events">{center.location}</CardBlock>
                </div>
              ))}
            </div>
            <Pagination
              className="justify-content-center"
              linkClass="page-link"
              itemClass="page-item"
              innerClass="pagination justify-content-center"
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={this.props.listOfCenters.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}/>
          </div>}
        </section>
        <Footer/>
        <ListEvents ref='eventModal'/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {loading: state.center.isLoading, alert: state.center.error, alertMessage: state.center.errorMessage, listOfCenters: state.center.centerList, listOfAllCenters: state.center.allCenterList};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCenters: getCenters,
    filterBy: filterBy
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Events);
