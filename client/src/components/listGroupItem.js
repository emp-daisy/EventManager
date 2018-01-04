import React from 'react';
import PropTypes from 'prop-types';

class ListGroupItem extends React.Component {
  render() {
    return (
      <div
        className="list-group-item mb-2 bg-black flex-column align-items-start text-white">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.name}</h5>
          <small>{this.props.owner}</small>
        </div>
        <p className="mb-1">
          {this.props.start}<span>{' - '}</span>{this.props.end}
        </p>
        <div className="d-flex w-100 justify-content-end p-2">
          {this.props.edit
            ? <div>
                <button
                  type="button"
                  className="mx-2 btn btn-dark"
                  data-toggle="modal"
                  data-target="#addEvent"
                  data-id="test">
                  Edit
                </button>
                <button className="mx-2 btn btn-sm btn-secondary">Delete</button>
              </div>
            : this.props.buttons
}</div>
      </div>
    );
  }
};
ListGroupItem.defaultProps = {
  edit: false
}
ListGroupItem.propTypes = {
  start: PropTypes.any.isRequired,
  end: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  owner: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  buttons: PropTypes.element
}
export default ListGroupItem;
