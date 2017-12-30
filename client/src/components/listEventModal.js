import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import ListGroupItem from './listGroupItem';
import Pagination from 'react-js-pagination';
import SearchBlock from './searchForm';
import {getEvents, filterEventsBy} from '../actions/event';

class ListEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePAge: 1,
      searchText: ''
    };
    this.onChange = this
      .onChange
      .bind(this);
    this.onFilterEventSearch = this
      .onFilterEventSearch
      .bind(this);
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.handleCloseModal = this
      .handleCloseModal
      .bind(this);

  }

  onFilterEventSearch(event) {
    event.preventDefault();
    this
      .props
      .filterEvent(this.state.searchText, this.props.listOfEvents);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  handleCloseModal(event) {
    $.noConflict();
    $('#listEvent').hide();
  }
  render() {
    const isEnabled = this.state.searchText.length > 0;
    return (
      <div
        className="modal"
        id="listEvent"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title col-4">Center Name</h5>
              <SearchBlock
                onChange={this.onChange}
                onFilter={this.onFilterEventSearch}
                disabled={!isEnabled}/>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleCloseModal}>
                <span aria-hidden="true">&times;</span>
              </button>
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
  return {loading: state.center.isLoading, alert: state.center.error, alertMessage: state.center.errorMessage, listOfCenters: state.center.centerList, listOfAllCenters: state.center.allCenterList};
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getEvents: getEvents,
    filterEvent: filterEventsBy
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListEvent);
