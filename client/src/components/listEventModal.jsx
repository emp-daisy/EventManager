import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import moment from 'moment';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import ListGroupItem from './listGroupItem';
import SearchBlock from './searchForm';
import { getEventsByCenter, filterEventsBy } from '../actions/event';
/**
 *
 *
 * @class ListEvent
 * @extends {Component}
 */
class ListEvent extends Component {
  /**
   * Creates an instance of ListEvent.
   * @param {any} props
   * @memberof ListEvent
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      perPage: 20,
      searchText: '',
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
  }
  /**
   *
   * @returns {null} no return
   * @memberof ListEvent
   */
  componentWillMount() {
    this
      .props
      .getEventsByCenter(this.props.showValue.id);
  }
  /**
   *
   * @returns {null} no return
   * @memberof ListEvent
   */
  componentDidMount() {
    $(this.listEvent).show();
  }
  /**
   *
   * @returns {null} no return
   * @param {any} nextProps
   * @param {any} nextState
   * @memberof ListEvent
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.searchText !== this.state.searchText) {
      this.handlePageChange(1);
      this
        .props
        .filterEventsBy(nextState.searchText, this.props.listOfAllEvents);
    }
  }
  /**
   *
   * @returns {null} no return
   * @param {any} event
   * @memberof ListEvent
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
     * @memberof ListEvent
  */
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  /**
    *
    *
    * @returns {element} HTML element
    * @memberof ListEvent
  */
  render() {
    const { activePage, perPage } = this.state;
    const { listOfEvents } = this.props;
    // Logic for displaying pages
    const indexOfLastItems = activePage * perPage;
    const indexOfFirstItems = indexOfLastItems - perPage;
    const pageItems = listOfEvents.slice(indexOfFirstItems, indexOfLastItems);
    return (
      <div
        className="modal"
        id="listEvent"
        ref={(e) => { this.listEvent = e; }}
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header flex-column pb-0">
              <div className="d-flex flex-row justify-content-end ml-auto">
                {pageItems.length > 0 &&
                  <SearchBlock onChange={this.onChange} showButton={false} />
                }
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.onHide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="d-flex flex-row">
                <h5 className="modal-title">{this.props.showValue.name}</h5>
              </div>
            </div>
            <div
              className="modal-body"
              style={{
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto'
              }}
            >
              {pageItems.length > 0
                ?
                  <div className="list-group">
                    {pageItems.map(event => (<ListGroupItem
                      key={event.id}
                      owner={event.User.organiser}
                      details={(
                        <span>{moment(event.startDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                          <span>
                            {' - '}
                          </span>
                          {moment(event.endDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                        </span>
                      )}
                      id={event.id}
                      name={event.name}
                      buttons={(
                        <div>
                          <button type="button" className="mx-2 btn-sm btn-dark">
                            Attend
                          </button>
                        </div>
                      )}
                    />))}
                  </div>
                : <h3 className="text-center">No event available</h3>
              }
            </div>
            <div className="modal-footer">
              <Pagination
                hideDisabled
                className="justify-content-center"
                linkClass="page-link"
                itemClass="page-item"
                innerClass="pagination justify-content-center"
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.perPage}
                totalItemsCount={this.props.listOfEvents.length}
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.event.isLoading,
  alert: state.event.error,
  alertMessage: state.event.errorMessage,
  listOfEvents: state.event.eventList,
  listOfAllEvents: state.event.allEventList
});
const matchDispatchToProps = dispatch => bindActionCreators({
  getEventsByCenter,
  filterEventsBy
}, dispatch);

ListEvent.propTypes = {
  showValue: PropTypes.shape({ id: PropTypes.any, name: PropTypes.any }).isRequired,
  onHide: PropTypes.func.isRequired,
  getEventsByCenter: PropTypes.func.isRequired,
  filterEventsBy: PropTypes.func.isRequired,
  listOfEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOfAllEvents: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default connect(mapStateToProps, matchDispatchToProps)(ListEvent);
