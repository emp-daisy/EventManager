import { API_URL } from '../store/setupStore';
import { getToken } from './authentication';

export const getEventsByCenter = id => (dispatch) => {
  dispatch({ type: 'REQUEST_EVENTS' });

  fetch(`${API_URL}centers/${id}`)
    .then(res => res.json())
    .then((data) => {
      const resEvents = (data.val)
        ? data.val.events
        : [];

      dispatch({ type: 'REQUEST_EVENTS_GRANTED', data: resEvents });
    }, () => {
      dispatch({ type: 'REQUEST_EVENTS_FAILED', msg: 'Error connecting to server...' });
    });
};

export const getEventsByUser = () => (dispatch) => {
  dispatch({ type: 'REQUEST_USER_EVENTS' });

  fetch(`${API_URL}events`, {
    method: 'get',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res.json())
    .then((data) => {
      const resEvents = (data.val)
        ? data.val
        : [];

      dispatch({ type: 'REQUEST_USER_EVENTS_GRANTED', data: resEvents });
    }, () => {
      dispatch({ type: 'REQUEST_USER_EVENTS_FAILED', msg: 'Error connecting to server...' });
    });
};

export const deleteEvent = id => (dispatch) => {
  dispatch({ type: 'DELETE_EVENTS' });
  fetch(`${API_URL}events/${id}`, {
    method: 'delete',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res)
    .then((data) => {
      if (data.status === 200) {
        dispatch({ type: 'DELETE_EVENTS_GRANTED', id: +id });
      } else {
        dispatch({ type: 'DELETE_EVENTS_FAILED', msg: 'Error deleting from to server. TRY AGAIN LATER' });
      }
    }, () => {
      dispatch({ type: 'DELETE_EVENTS_FAILED', msg: 'Error deleting from to server...' });
    });
};

export const createEvent = eventData => (dispatch) => {
  dispatch({ type: 'CREATE_EVENTS' });
  fetch(`${API_URL}events/`, {
    method: 'post',
    headers: {
      'x-access-token': getToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
    .then(res => res)
    .then((data) => {
      console.log('RESPONSEEEEEEEE', data.json());
      if (data.status === 201) {
        dispatch({ type: 'CREATE_EVENTS_GRANTED' });
      } else {
        dispatch({ type: 'CREATE_EVENTS_FAILED', msg: 'Error creating new event. TRY AGAIN LATER' });
      }
    }, () => {
      dispatch({ type: 'CREATE_EVENTS_FAILED', msg: 'Error creating new event...' });
    });
};

export const updateEvent = (eventData, id) => (dispatch) => {
  dispatch({ type: 'UPDATE_EVENTS' });
  fetch(`${API_URL}events/${id}`, {
    method: 'put',
    body: JSON.stringify(eventData),
    headers: {
      'x-access-token': getToken(),
      'Content-Type': 'application/json'
    }
  })
    .then(res => res)
    .then((data) => {
      console.log('RESPONSEEEEEEEE', data.json());
      if (data.status === 200) {
        dispatch({ type: 'UPDATE_EVENTS_GRANTED' });
      } else {
        dispatch({ type: 'UPDATE_EVENTS_FAILED', msg: 'Error updating event. TRY AGAIN LATER' });
      }
    }, () => {
      dispatch({ type: 'UPDATE_EVENTS_FAILED', msg: 'Error updating event...' });
    });
};

export const filterEventsBy = (searchValue, events) => (dispatch) => {
  let filtered = [];

  filtered = events.filter(o => Object.keys(o).some((k) => {
    if (o[k]) {
      return o[k]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase());
    }
    return false;
  }));

  dispatch({ type: 'FILTER_EVENTS_BY', data: filtered });
};
