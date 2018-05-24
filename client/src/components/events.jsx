import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import Spinner from './spinner';
import CardBlock from './cards';
import { getCenters, filterCentersBy } from '../actions/center';
import SearchBlock from './searchForm';
import ListEvents from './listEventModal';
/**
 *
 *
 * @class Events
 * @extends {Component}
 */
class Events extends Component {
  /**
   * Creates an instance of Events.
   * @param {any} props
   * @memberof Events
   */
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
    this.handlePageChange = this.handlePageChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * @returns {null} no return
   * @memberof Events
   */
  componentWillMount() {
    this.props.getCenters();
  }

  /**
     *
     *@returns {null} no return
    * @param {any} nextProps
    * @param {any} nextState
    * @memberof Events
    */
  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.searchText !== this.state.searchText ||
      nextState.selectOption !== this.state.selectOption
    ) {
      this.handlePageChange(1);
      this.props.filterCentersBy(
        nextState.selectOption,
        nextState.searchText,
        this.props.listOfAllCenters
      );
    }
  }

  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof Events
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
   * @memberof Events
   */
  handlePageChange(pageNumber) {
    this.cardList.scrollIntoView({ block: 'start', behavior: 'smooth' });
    this.setState({ activePage: pageNumber });
  }
  /**
   *
   * @returns {null} no return
   * @param {any} id
   * @memberof Events
   */
  showModal(id) {
    this.setState({ showEventKey: id });
    this.setState({ showEvent: true });
    document.body.classList.add('modal-open');
  }
  /**
   *
   * @returns {null} no return
   * @memberof Events
   */
  hideModal() {
    this.setState({ showEventKey: '' });
    this.setState({ showEvent: false });
    document.body.classList.remove('modal-open');
  }
  /**
   *
   *
   * @returns {element} returns html code for page
   * @memberof Events
   */
  render() {
    const { activePage, perPage } = this.state;
    const { listOfCenters } = this.props;
    // Logic for displaying pages
    const indexOfLastItems = activePage * perPage;
    const indexOfFirstItems = indexOfLastItems - perPage;
    const pageItems = listOfCenters.slice(indexOfFirstItems, indexOfLastItems);

    return (
      <div className="wrapper">
        <Header />
        <section
          className="container-fluid full-height-80 background-img"
          id="event"
        >
          <h2 className="mx-5 font-weight-bold text-white">
            Available Centers
          </h2>
          <div className="row text-center m-4 justify-content-center">
            <div className="col-md-6 col-sm-12 offset-md-6">
              {pageItems.length > 0 && <SearchBlock
                onChange={this.onChange}
                showButton={false}
                dropDownArray={['All', 'Name', 'Location', 'Facilities']}
              />
            }
            </div>
          </div>
          {this.props.alert &&
            <div className="alert alert-danger">
              {this.props.alertMessage}
            </div>}
          {this.props.loading && <Spinner />}
          {pageItems.length === 0 &&
            !this.props.alert &&
            <h3 className="text-white">No center found</h3>}

          {pageItems.length > 0 &&
            <div
              ref={(e) => {
                this.cardList = e;
              }}
            >
              <div className="card-deck">
                {pageItems.map(center => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 mt-4"
                    key={center.id}
                  >
                    <CardBlock
                      id={center.id}
                      src={center.image ? center.image : undefined}
                      title={center.name}
                      facilities={center.facilities}
                      onClick={() => this.showModal(center)}
                      buttonText="Check events"
                    >
                      {center.location}, {center.state}
                    </CardBlock>
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
                onChange={this.handlePageChange}
              />
            </div>}
        </section>
        <Footer />{' '}
        {this.state.showEvent &&
          <ListEvents
            ref={(e) => {
              this.eventModel = e;
            }}
            onHide={this.hideModal}
            showValue={this.state.showEventKey}
          />}
      </div>
    );
  }
}

Events.propTypes = {
  getCenters: PropTypes.func.isRequired,
  filterCentersBy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  listOfCenters: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOfAllCenters: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  loading: state.center.isLoading,
  alert: state.center.error,
  alertMessage: state.center.errorMessage,
  listOfCenters: state.center.centerList,
  listOfAllCenters: state.center.allCenterList
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCenters,
      filterCentersBy
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Events);
