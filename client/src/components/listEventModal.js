import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ListGroupItem from './listGroupItem';
import Pagination from 'react-js-pagination';
import SearchBlock from './searchForm';
import {getEventsByCenter, filterEventsBy} from '../actions/event';

class ListEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      perPage: 20,
      searchText: '',
      events: [],
      localeOptions: {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.handlePageChange = this
      .handlePageChange
      .bind(this);

  }
  componentWillMount() {
    this
      .props
      .getEventsByCenter(this.props.showValue.id);
  }
  componentDidMount() {
    $(this.refs.listEvent).show();
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.searchText !== this.state.searchText) {
      this.setState({activePage: 1});
      this
        .props
        .filterEventsBy(nextState.searchText, this.props.listOfAllEvents);
    }
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  render() {
    const {activePage, perPage} = this.state;
    const {listOfEvents} = this.props;
    // Logic for displaying pages
    const indexOfLastItems = activePage * perPage;
    const indexOfFirstItems = indexOfLastItems - perPage;
    const pageItems = listOfEvents.slice(indexOfFirstItems, indexOfLastItems);
    return (
      <div
        className="modal"
        id="listEvent"
        ref="listEvent"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header flex-column pb-0">
              <div className="d-flex flex-row justify-content-end ml-auto">
                <SearchBlock onChange={this.onChange} showButton={false}/>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.onHide}>
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
              'maxHeight': 'calc(100vh - 100px)',
              'overflowY': 'auto'
            }}>
              {pageItems.length > 0
                ? <div className="list-group">
                    {pageItems.map(event => (<ListGroupItem
                      key={event.id}
                      owner={event.User.organiser}
                      start={new Date(event.startDate).toLocaleString('en-GB', this.state.localeOptions)}
                      end={new Date(event.endDate).toLocaleString('en-GB', this.state.localeOptions)}
                      id={event.id}
                      name={event.name}
                      buttons={(
                      <div>
                        <button type="button" className="mx-2 btn-sm btn-dark">
                          Attend
                        </button>
                      </div>
                    )}/>))}

                  </div>
                : <h3 className="text-center">No event available</h3>
}</div>
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
                onChange={this.handlePageChange}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {loading: state.event.isLoading, alert: state.event.error, alertMessage: state.event.errorMessage, listOfEvents: state.event.eventList, listOfAllEvents: state.event.allEventList};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getEventsByCenter: getEventsByCenter,
    filterEventsBy: filterEventsBy
  }, dispatch);
}

ListEvent.propTypes = {
  showValue: PropTypes.any.isRequired,
  onHide: PropTypes.func.isRequired
}
export default connect(mapStateToProps, matchDispatchToProps)(ListEvent);
