import { API_URL } from '../store/setupStore';
import { getToken } from './authentication';
import { addNotification, connectionError, validationError } from './notify';

export const getCenters = () => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'REQUEST_CENTERS' });

  fetch(`${API_URL}centers`)
    .then(res => res.json())
    .then((data) => {
      let resCenters = [];
      if (data.val) {
        resCenters = data.val;
      }
      dispatch({ type: 'REQUEST_CENTERS_GRANTED', data: resCenters });
    }, () => {
      dispatch({ type: 'REQUEST_CENTERS_FAILED', msg: 'Error connecting to server...' });
      connectionError(dispatch);
    });
};

export const deleteCenter = id => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'DELETE_CENTERS' });
  fetch(`${API_URL}centers/${id}`, {
    method: 'delete',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res)
    .then((data) => {
      if (data.status === 200) {
        dispatch({ type: 'DELETE_CENTERS_GRANTED', id: +id });
        dispatch(addNotification({
          message: 'Delete successful',
          level: 'success',
          autoDismiss: 10
        }));
      } else {
        dispatch({ type: 'DELETE_CENTERS_FAILED', msg: 'Error deleting from to server. TRY AGAIN LATER' });
        connectionError(dispatch, data.json());
      }
    }, () => {
      dispatch({ type: 'DELETE_CENTERS_FAILED', msg: 'Error deleting from to server...' });
      connectionError(dispatch);
    });
};

export const createCenter = centerData => (dispatch) => {
  dispatch({ type: 'CREATE_CENTERS' });
  fetch(`${API_URL}centers/`, {
    method: 'post',
    headers: {
      'x-access-token': getToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(centerData)
  })
    .then(res => res)
    .then((data) => {
      const dataBody = data.json();
      if (data.status === 201) {
        dispatch({ type: 'CREATE_CENTERS_GRANTED' });
      } else {
        dispatch({ type: 'CREATE_CENTERS_FAILED', msg: 'Error creating new event. TRY AGAIN LATER' });
        dataBody.then((res) => {
          connectionError(dispatch, validationError(res));
        });
      }
    }, () => {
      dispatch({ type: 'CREATE_CENTERS_FAILED', msg: 'Error creating new event...' });
      connectionError(dispatch);
    });
};

export const updateCenter = (centerData, id) => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'UPDATE_CENTERS' });
  fetch(`${API_URL}centers/${id}`, {
    method: 'put',
    body: JSON.stringify(centerData),
    headers: {
      'x-access-token': getToken(),
      'Content-Type': 'application/json'
    }
  })
    .then(res => res)
    .then((data) => {
      const dataBody = data.json();
      if (data.status === 200) {
        dispatch({ type: 'UPDATE_CENTERS_GRANTED' });
      } else {
        dispatch({ type: 'UPDATE_CENTERS_FAILED', msg: 'Error updating event. TRY AGAIN LATER' });
        dataBody.then((res) => {
          connectionError(dispatch, validationError(res));
        });
      }
    }, () => {
      dispatch({ type: 'UPDATE_CENTERS_FAILED', msg: 'Error updating event...' });
      connectionError(dispatch);
    });
};

export const filterCentersBy = (filterValue, searchValue, centers) => (dispatch) => {
  let filtered = [];

  if (searchValue.length === 0) {
    filtered = centers;
  } else if (filterValue === 'all') {
    filtered = centers.filter(o => Object.keys(o).some((k) => {
      if (o[k]) {
        return o[k]
          .toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase());
      }
      return false;
    }));
  } else {
    filtered = centers.filter(((k) => {
      if (k[filterValue]) {
        return k[filterValue]
          .toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase());
      }
      return false;
    }));
  }
  dispatch({ type: 'FILTER_CENTERS_BY', data: filtered });
};

export const getCentersOptions = () => () => fetch(`${API_URL}centers`)
  .then(res => res.json())
  .then((data) => {
    const resCenters = (data.val || []).map(center => ({ name: `${center.name}, ${center.location}, ${center.state}`, id: center.id }));
    return { options: resCenters, complete: true };
  }, () => ({ options: [], complete: true }));
