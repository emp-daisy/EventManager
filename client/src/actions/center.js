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
        console.log('CENTERS_RETRIEVED', data);
        dispatch({type: 'REQUEST_CENTERS_GRANTED', data: resCenters});
      }, err => {
        console.log('ERROR', err);
        dispatch({type: 'REQUEST_CENTERS_FAILED', msg: 'Error connecting to server...'})
      });
  }
}
