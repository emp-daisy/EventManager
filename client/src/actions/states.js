import { API_URL } from '../store/setupStore';

const getStates = () => () => fetch(`${API_URL}states`)
  .then(res => res.json())
  .then((data) => {
    let resStates = [];
    if (data.val) {
      resStates = data.val;
    }
    return { options: resStates, complete: true };
  }, () => ({ options: [], complete: true }));
export default getStates;
