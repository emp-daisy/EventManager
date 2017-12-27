const defaultState = {
  isLoading: false,
  error: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  centerList: []
};

const centers = (state = defaultState, action) => {
  let currentState;
  switch (action.type) {
    case 'REQUEST_CENTERS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'REQUEST_CENTERS_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: false,
        centerList: action.data
      });
      break;
    case 'REQUEST_CENTERS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    default:
      currentState = state;
  }
  return currentState;
}

export default centers;
