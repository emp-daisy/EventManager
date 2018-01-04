import {API_URL} from '../store/setupStore';

export const getEventsByCenter = (id) => {
  return (dispatch) => {
    dispatch({type: "REQUEST_EVENTS"});

    fetch(`${API_URL}centers/${id}`)
      .then(res => res.json())
      .then(data => {
        let resEvents = [];
        if (data.val) {
          resEvents = data.val.events
        }
        dispatch({type: 'REQUEST_EVENTS_GRANTED', data: resEvents});
      }, err => {
        dispatch({type: 'REQUEST_EVENTS_FAILED', msg: 'Error connecting to server...'})
      });
  }
}

export const filterEventsBy = (searchValue, events) => {
  return (dispatch) => {
    let filtered = [];

    filtered = events.filter(o => Object.keys(o).some(k => {
      if (o[k]) {
        return o[k]
          .toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase())
      } else {
        return false
      }
    }));

    dispatch({type: 'FILTER_EVENTS_BY', data: filtered});
  }
}
