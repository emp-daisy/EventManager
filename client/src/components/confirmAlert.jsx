import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDelete = props => (
  <div
    className="modal text-center d-block"
    id="confirmModal"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Confirming Delete</h1>
        </div>
        <div className="modal-body">
          <div>
            <h3>Are you sure you want to delete
              <span className="font-weight-bold"> {props.name}</span>?
            </h3>
            <p className="lead font-weight-bold text-warning">This cannot be undone!</p>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            id="btnAccept"
            onClick={() => { props.onConfirm(); props.onCancel(); }}
            className="btn btn-danger btn-block border-1 text-white py-3"
          >Yes
          </button>
          <button
            type="button"
            id="btnReject"
            onClick={props.onCancel}
            className="btn btn-dark btn-block border-1 text-white py-3"
          >No
          </button>
        </div>
      </div>
    </div>
  </div>
);

ConfirmDelete.defaultProps = {
  name: '',
  onConfirm: () => {},
  onCancel: () => {}
};
ConfirmDelete.propTypes = {
  name: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};
export default ConfirmDelete;
