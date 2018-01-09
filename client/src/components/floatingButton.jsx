import React from 'react';

const FloatingButton = () => (
  <button
    type="button"
    className="btn btn-dark btn-circle-float"
    id="user-add"
    data-toggle="modal"
    data-target="#addEvent"
    data-placement="left"
    title="New event"
  >
    <i className="fa fa-plus" />
  </button>
);

export default FloatingButton;
