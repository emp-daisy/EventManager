import React, {Component} from 'react';
import ListGroupItem from './listGroupItem';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import SearchBlock from './searchForm';

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

  render() {
    const isEnabled = this.state.searchText.length > 0;
    return (
      <div
        className="modal fade"
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
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
              'max-height': 'calc(100vh - 100px)',
              'overflow-y': 'auto'
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
                totalItemsCount={this.props.listOfEvents.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const CenterModal = () => (
  <div
    className="modal fade text-center"
    id="addCenter"
    data-backdrop="static"
    data-keyboard="false">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">New Center</h1>
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Center name"/>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Description"/>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Location"/>
              </div>
              <div className="form-row">
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-block border-1 text-black py-3 btn-light btn-block"
                    data-dismiss="modal">Cancel
                  </button>
                </div>
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-dark btn-block border-1 text-white py-3">Add Center
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EventModal = () => (
  <div
    className="modal fade text-center"
    id="addEvent"
    data-backdrop="static"
    data-keyboard="false">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">New event</h1>
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <form>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Event name"/>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Description"/>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input className="form-control" type="date" placeholder="Date"/>
                </div>
                <div className="form-group col col-md-12">
                  <input className="form-control" type="time" placeholder="Time"/>
                </div>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Location"/>
              </div>
              <div className="form-row">
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-block border-1 text-black py-3 btn-light btn-block"
                    data-dismiss="modal">Cancel
                  </button>
                </div>
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-dark btn-block border-1 text-white py-3">Add Event
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default {
  CenterModal,
  EventModal,
  ListEvent
};
