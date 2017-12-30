import {API_URL} from '../store/setupStore';

export const getCenters = () => {
  return (dispatch) => {
    dispatch({type: "REQUEST_CENTERS"});

    fetch(`${API_URL}centers`)
      .then(res => res.json())
      .then(data => {
        let resCenters = [];
        if (data.val) {
          resCenters = data.val
        }
        dispatch({type: 'REQUEST_CENTERS_GRANTED', data: resCenters});
      }, err => {
        console.log('ERROR', err);
        dispatch({type: 'REQUEST_CENTERS_FAILED', msg: 'Error connecting to server...'})
      });
  }
}

export const filterBy = (filterValue, searchValue, centers) => {
  return (dispatch) => {
    let filtered = [];

    if (filterValue === 'all') {
      filtered = centers.filter(o => Object.keys(o).some(k => {
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
      filtered = centers.filter((k => {
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
    dispatch({type: 'FILTER_BY', data: filtered});
  }
}
