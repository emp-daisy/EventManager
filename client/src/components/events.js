import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Footer from './footer';
import Pagination from 'react-js-pagination';
import Spinner from './spinner';
import CardBlock from './cards';
import {getCenters, filterCentersBy} from '../actions/center';
import SearchBlock from './searchForm';
import ListEvents from './listEventModal';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      searchText: '',
      selectOption: 'all',
      perPage: 12,
      showEventKey: '',
      showEvent: false
    };
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.showModal = this
      .showModal
      .bind(this);
    this.hideModal = this
      .hideModal
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
  }

  componentWillMount() {
    this
      .props
      .getCenters();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.searchText !== this.state.searchText || nextState.selectOption !== this.state.selectOption) {
      this.setState({activePage: 1});
      this
        .props
        .filterCentersBy(nextState.selectOption, nextState.searchText, this.props.listOfAllCenters);
    }
  }

  handlePageChange(pageNumber) {
    this
      .refs
      ._list
      .scrollIntoView({block: 'start', behavior: 'smooth'});
    this.setState({activePage: pageNumber});
  }

  showModal(id) {
    this.setState({showEventKey: id});
    this.setState({showEvent: true});
  }
  hideModal() {
    this.setState({showEventKey: ''});
    this.setState({showEvent: false});
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
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
                showButton={false}
                dropDownArray={['All', 'Name', 'Location', 'Facilities']}/>
            </div>
          </div>
          {this.props.alert && <div className="alert alert-danger">{this.props.alertMessage}</div>}
          {this.props.loading && <Spinner/>}
          {(pageItems.length === 0 && !this.props.alert) && <h3 className="text-white">No center found</h3>}

          {pageItems.length > 0 && <div ref='_list'>
            <div className="card-deck">
              {pageItems.map(center => (
                <div className="col-sm-6 col-md-4 col-lg-3 mt-4" key={center.id}>
                  <CardBlock
                    id={center.id}
                    src={center.image
                    ? center.image
                    : undefined}
                    title={center.name}
                    onClick={() => this.showModal(center)}
                    buttonText="Check events">{center.location}, {center.state}</CardBlock>
                </div>
              ))}
            </div>
            <Pagination
              hideDisabled
              className="justify-content-center"
              linkClass="page-link"
              itemClass="page-item"
              innerClass="pagination justify-content-center m-4"
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={this.props.listOfCenters.length}
              onChange={this.handlePageChange}/>
          </div>}
        </section>
        <Footer/> {this.state.showEvent && <ListEvents
          ref='eventModal'
          onHide={this.hideModal}
          showValue={this.state.showEventKey}/>
}
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
    filterCentersBy: filterCentersBy
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Events);
