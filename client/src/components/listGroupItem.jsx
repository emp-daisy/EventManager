import React from 'react';
import PropTypes from 'prop-types';

const ListGroupItem = props => (
  <div
    id={props.id}
    className="list-group-item mb-2 bg-black flex-column align-items-start text-white"
  >
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{props.name}</h5>
      <small>{props.owner}</small>
    </div>
    <p className="mb-1">
      {props.details}
    </p>
    <div className="d-flex w-100 justify-content-end p-2">
      {props.edit
            ?
              <div>
                <button
                  type="button"
                  className="mx-2 btn btn-dark btn-sm"
                  onClick={props.onEdit}
                >
                  Edit
                </button>
                <button className="mx-2 btn btn-sm btn-secondary" onClick={props.onDelete}>Delete</button>
              </div>
            : props.buttons
      }
    </div>
  </div>
);

ListGroupItem.defaultProps = {
  edit: false,
  details: '',
  owner: '',
  buttons: (<div />),
  onEdit: () => {},
  onDelete: () => {}
};
ListGroupItem.propTypes = {
  details: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.string,
  edit: PropTypes.bool,
  buttons: PropTypes.element,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
export default ListGroupItem;
