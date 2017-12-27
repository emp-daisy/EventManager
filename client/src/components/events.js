import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Footer from './footer';
import Pagination from 'react-js-pagination';
import Spinner from './spinner';
import {getCenters} from '../actions/center';
//import {checkTokenExpiry} from './actions/authentication';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePAge: 2
    };
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
  }

  componentWillMount() {
    // if (!checkTokenExpiry) {   this     .props     .history     .push('/'); }
    this
      .props
      .getCenters();
  }
  componentWillUpdate(nextProps) {
    //nextProps.getCenters();
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <section className="container-fluid full-height-80 parallex-img" id="event">
          <h2 className="mx-5 font-weight-bold text-white">Available Centers</h2>
          <div className="row text-center m-4 justify-content-center">
            <div className="col-md-6 col-sm-12 offset-md-6">
              <form action="#" method="get" id="searchForm" className="input-group">
                <div className="input-group-btn search-panel">
                  <select
                    name="search_param"
                    id="search_param"
                    className="btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                    <option value="all">All</option>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                    <option value="facilities">Facilities</option>
                  </select>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="x"
                  placeholder="Search by..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <span className="fa fa-search"/>
                  </button>
                </span>
              </form>
            </div>
          </div>
          {this.props.alert && <div className="alert alert-danger">{this.props.alertMessage}</div>}
          {this.props.loading && <Spinner/>}
          {(this.props.listOfCenters.length === 0 && !this.props.alert) && <h3 className="text-white">No center available</h3>}

          {this.props.listOfCenters.length > 0 && <div>
            <div className="row align-items-center m-4 justify-content-center">
              {this
                .props
                .listOfCenters
                .map(center => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={center.id}>
                    <div className="card" key={center.id}>
                      <img className="card-img-top" src={center.image} alt={center.name}/>
                      <div className="card-body">
                        <h4 className="card-title">{center.name}</h4>
                        <p className="card-text">{center.location}
                        </p>
                        <a
                          href="events.html"
                          className="btn btn-dark btn-block border-1 text-white py-3">Check events
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination
              className="justify-content-center"
              linkClass="page-link"
              itemClass="page-item"
              innerClass="pagination justify-content-center"
              activePage={this.state.activePage}
              itemsCountPerPage={12}
              totalItemsCount={this.props.listOfCenters.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}/>
          </div>}
        </section>
        <Footer/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {loading: state.center.isLoading, alert: state.center.error, alertMessage: state.center.errorMessage, listOfCenters: state.center.centerList};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCenters: getCenters
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Events);
