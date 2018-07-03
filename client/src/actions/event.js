import { API_URL } from '../store/setupStore';
import { getToken } from './authentication';
import { addNotification, connectionError, validationError } from './notify';

export const getEventsByUser = () => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'REQUEST_USER_EVENTS' });

  return fetch(`${API_URL}events`, {
    method: 'get',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res.json())
    .then((data) => {
      const resEvents = (data.val)
        ? data.val
        : { centers: [], meta: {} };

      dispatch({ type: 'REQUEST_USER_EVENTS_GRANTED', data: resEvents });
    }, () => {
      dispatch({ type: 'REQUEST_USER_EVENTS_FAILED', msg: 'Error connecting to server...' });
      connectionError(dispatch);
    });
};

export const deleteEvent = id => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'DELETE_EVENTS' });
  return fetch(`${API_URL}events/${id}`, {
    method: 'delete',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then((data) => {
      if (data.status === 200) {
        dispatch({ type: 'DELETE_EVENTS_GRANTED', id });
        dispatch(addNotification({
          message: 'Delete successful',
          level: 'success',
          autoDismiss: 10
        }));
      } else {
        dispatch({ type: 'DELETE_EVENTS_FAILED', msg: 'Error deleting from to server. TRY AGAIN LATER' });
        connectionError(dispatch);
      }
    }, () => {
      dispatch({ type: 'DELETE_EVENTS_FAILED', msg: 'Error deleting from to server...' });
      connectionError(dispatch);
    });
};

export const createEvent = eventData => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'CREATE_EVENTS' });
  return fetch(`${API_URL}events/`, {
    method: 'post',
    headers: {
      'x-access-token': getToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
    .then(data => data.json()
      .then((res) => {
        if (data.status === 201) {
          dispatch({ type: 'CREATE_EVENTS_GRANTED', newData: res.val });
          dispatch(addNotification({
            message: 'New Event added successful',
            level: 'success',
            autoDismiss: 10
          }));
        } else {
          dispatch({ type: 'CREATE_EVENTS_FAILED', msg: 'Error creating new event. TRY AGAIN LATER' });
          connectionError(dispatch, validationError(res));
        }
      }), () => {
      dispatch({ type: 'CREATE_EVENTS_FAILED', msg: 'Error creating new event...' });
      connectionError(dispatch);
    });
};

export const updateEvent = (eventData, id) => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'UPDATE_EVENTS' });
  return fetch(`${API_URL}events/${id}`, {
    method: 'put',
    body: JSON.stringify(eventData),
    headers: {
      'x-access-token': getToken(),
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json()
      .then((res) => {
        if (data.status === 200) {
          dispatch({ type: 'UPDATE_EVENTS_GRANTED', newData: res.val });
          dispatch(addNotification({
            message: 'Update successful',
            level: 'success',
            autoDismiss: 10
          }));
        } else {
          dispatch({ type: 'UPDATE_EVENTS_FAILED', msg: 'Error updating event. TRY AGAIN LATER' });
          connectionError(dispatch, validationError(res));
        }
      }), () => {
      dispatch({ type: 'UPDATE_EVENTS_FAILED', msg: 'Error updating event...' });
      connectionError(dispatch);
    });
};

export const filterEventsBy = searchValue => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION'
  });
  dispatch({
    type: 'REQUEST_USER_EVENTS'
  });

  return fetch(`${API_URL}events/?name=${searchValue.toString().toLowerCase()}`, {
    method: 'get',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res.json())
    .then((data) => {
      let resEvents = [];
      if (data.val) {
        resEvents = data.val;
      }
      dispatch({
        type: 'REQUEST_USER_EVENTS_GRANTED',
        data: resEvents
      });
    }, () => {
      dispatch({
        type: 'REQUEST_USER_EVENTS_FAILED',
        msg: 'Error connecting to server...'
      });
      connectionError(dispatch);
    });
};
