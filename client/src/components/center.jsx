import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import HeaderBlock from './header';
import Footer from './footer';
import Spinner from './spinner';
import CardBlock from './cards';
import { getCenters, filterCentersBy } from '../actions/center';
import SearchBlock from './searchForm';
/**
 *
 *
 * @class Events
 * @extends {Component}
 */
class Center extends Component {
  /**
   * Creates an instance of Events.
   * @param {any} props
   * @memberof Events
   */
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectOption: 'name',
      searching: false
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchReset = this.onSearchReset.bind(this);
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
   * @returns {null} search action
   * @memberof Events
   */
  onSearch() {
    this.setState({ searching: true });
    this.props.filterCentersBy(this.state.selectOption, this.state.searchText);
  }
  /**
  *
  * @returns {null}  reset search action
  * @memberof Events
  */
  onSearchReset() {
    this.setState({ searching: false, searchText: '' });
    this.props.getCenters();
  }
  /**
   *
   * @returns {null} no return
   * @param {any} pageNumber
   * @memberof Events
   */
  handlePageChange() {
    this.cardList.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  /**
   *
   *
   * @returns {element} returns html code for page
   * @memberof Events
   */
  render() {
    const { listOfCenters } = this.props;
    const {
      page, limit, total, pages
    } = this.props.paginationMeta;

    return (
      <div className="inner-wrapper center-page">
        <HeaderBlock location={this.props.location.pathname} />
        <section
          className="container-fluid flex-grow background-img"
          id="event"
        >
          <h2 className="mx-5 font-weight-bold text-white">Centers</h2>
          <div className="row text-center m-4 justify-content-center">
            <div className="col-md-6 col-sm-12 offset-md-6">
              {(listOfCenters.length > 0 || this.state.searching) && (
                <SearchBlock
                  onChange={this.onChange}
                  onFilter={this.onSearch}
                  onReset={this.onSearchReset}
                  disabled={this.state.searchText === ''}
                  hideReset={this.state.searching}
                  dropDownArray={['Name', 'Location', 'Facilities']}
                />
              )}
            </div>
          </div>
          {this.props.alert && (
            <div className="alert alert-danger">{this.props.alertMessage}</div>
          )}

          {this.props.loading && <Spinner />}

          {listOfCenters.length === 0 &&
            !this.props.alert && (
              <h3 className="text-white">No center found</h3>
            )}

          {listOfCenters.length > 0 && (
            <div
              ref={(e) => {
                this.cardList = e;
              }}
            >
              <div className="card-deck center-deck">
                {listOfCenters.map(center => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 mt-4 p-0"
                    key={center.id}
                  >
                    <CardBlock
                      id={center.id}
                      src={center.image ? center.image : undefined}
                      title={center.name}
                      facilities={center.facilities}
                      onClick={() => {
                        this.props.history.push(`/center/description/${center.id}`);
                      }}
                      buttonText="View"
                    >
                      {center.location}, {center.state}
                    </CardBlock>
                  </div>
                ))}
              </div>
              {pages.length > 1 && (
                <Pagination
                  hideDisabled
                  className="justify-content-center"
                  linkClass="page-link"
                  itemClass="page-item"
                  innerClass="pagination justify-content-center m-4"
                  activePage={page}
                  itemsCountPerPage={limit}
                  totalItemsCount={total}
                  onChange={this.handlePageChange}
                />
              )}
            </div>
          )}
        </section>
        <Footer />
      </div>
    );
  }
}

Center.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  getCenters: PropTypes.func.isRequired,
  filterCentersBy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  alert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  listOfCenters: PropTypes.arrayOf(PropTypes.object).isRequired,
  paginationMeta: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  loading: state.center.isLoading,
  alert: state.center.error,
  alertMessage: state.center.errorMessage,
  paginationMeta: state.center.paginationMeta,
  listOfCenters: state.center.allCenterList
});
const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCenters,
      filterCentersBy
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Center);
