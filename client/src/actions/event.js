import {API_URL} from '../store/setupStore';

export const getEvents = () => {
  return (dispatch) => {
    dispatch({type: "REQUEST_EVENTS"});

    fetch(`${API_URL}events`)
      .then(res => res.json())
      .then(data => {
        let resEvents = [];
        if (data.val) {
          resEvents = data.val
        }
        dispatch({type: 'REQUEST_EVENTS_GRANTED', data: resEvents});
      }, err => {
        console.log('ERROR', err);
        dispatch({type: 'REQUEST_EVENTS_FAILED', msg: 'Error connecting to server...'})
      });
  }
}

export const filterEventsBy = (filterValue, searchValue, events) => {
  return (dispatch) => {
    let filtered = [];

    if (filterValue === 'all') {
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
    } else {
      filtered = events.filter((k => {
        if (k[filterValue]) {
          return k[filterValue]
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
        } else {
          return false
        }
      }))
    }
    dispatch({type: 'FILTER_EVENTS_BY', data: filtered});
  }
}
