import React from 'react';

const ListGroupItem = () => (
  <div
    className="list-group-item mb-2 bg-black flex-column align-items-start text-white"
  >
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Event name</h5>
      <small>Date/Time</small>
    </div>
    <p className="mb-1">Description: Donec id elit non mi porta gravida at eget
      metus. Maecenas sed diam eget risus varius blandit.
    </p>
    <div className="d-flex w-100 justify-content-end p-2">
      <button
        type="button"
        className="mx-2 btn btn-dark"
        data-toggle="modal"
        data-target="#addEvent"
        data-id="test"
      >
        Edit
      </button>
      <button className="mx-2 btn btn-sm btn-secondary">Delete</button>
    </div>
  </div>
);
export default ListGroupItem;
