import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ListGroupItem from './listGroupItem';
import Pagination from 'react-js-pagination';
import SearchBlock from './searchForm';
import {getEvents, filterEventsBy} from '../actions/event';

class ListEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePAge: 1,
      searchText: '',
      events: []
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
      .getEvents(this.props.showValue.id);
  }
  componentDidMount() {
    $(this.refs.listEvent).show();
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
              <div className="d-flex flex-row justify-content-end ml-auto"><SearchBlock onChange={this.onChange} showButton={false}/>
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
              <div className="list-group">
                <ListGroupItem/>
              </div>
            </div>
            <div className="modal-footer">
              <Pagination
                className="justify-content-center"
                linkClass="page-link"
                itemClass="page-item"
                innerClass="pagination justify-content-center"
                activePage={this.state.activePage}
                itemsCountPerPage={20}
                totalItemsCount={12}
                pageRangeDisplayed={5}
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
    getEvents: getEvents,
    filterEvent: filterEventsBy
  }, dispatch);
}

ListEvent.propTypes = {
  showValue: PropTypes.any.isRequired,
  onHide: PropTypes.func.isRequired
}
export default connect(mapStateToProps, matchDispatchToProps)(ListEvent);
