import React from 'react';
import ListGroupItem from './listGroupItem';
import Pagination from './pagination';

const ListEvent = () => (
  <div
    className="modal fade"
    id="listEvent"
    data-backdrop="static"
    data-keyboard="false"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title col-4">Center Name</h5>
          <form action="#" method="get" id="searchForm" className="input-group col-6">
            <input type="text" className="form-control" name="x" placeholder="Search..." />
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <span className="fa fa-search" />
              </button>
            </span>
          </form>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          className="modal-body"
          style="max-height: calc(100vh - 100px); overflow-y: auto;"
        >
          <div className="list-group">
            <ListGroupItem />
          </div>
        </div>
        <div className="modal-footer">
          <Pagination />
        </div>
      </div>
    </div>
  </div>
);

const CenterModal = () => (
  <div
    className="modal fade text-center"
    id="addCenter"
    data-backdrop="static"
    data-keyboard="false"
  >
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
                <input className="form-control" type="text" placeholder="Center name" />
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Description" />
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Location" />
              </div>
              <div className="form-row">
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-block border-1 text-black py-3 btn-light btn-block"
                    data-dismiss="modal"
                  >Cancel
                  </button>
                </div>
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-dark btn-block border-1 text-white py-3"
                  >Add Center
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
    data-keyboard="false"
  >
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
                <input className="form-control" type="text" placeholder="Event name" />
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Description" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input className="form-control" type="date" placeholder="Date" />
                </div>
                <div className="form-group col col-md-12">
                  <input className="form-control" type="time" placeholder="Time" />
                </div>
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Location" />
              </div>
              <div className="form-row">
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-block border-1 text-black py-3 btn-light btn-block"
                    data-dismiss="modal"
                  >Cancel
                  </button>
                </div>
                <div className="form-group col col-md-6">
                  <button
                    type="button"
                    className="btn btn-dark btn-block border-1 text-white py-3"
                  >Add Event
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
