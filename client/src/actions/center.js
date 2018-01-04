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
        dispatch({type: 'REQUEST_CENTERS_FAILED', msg: 'Error connecting to server...'})
      });
  }
}

export const filterCentersBy = (filterValue, searchValue, centers) => {
  return (dispatch) => {
    let filtered = [];

    if (searchValue.length === 0) {
      filtered = centers;
    } else if (filterValue === 'all') {
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
    dispatch({type: 'FILTER_CENTERS_BY', data: filtered});
  }
}
