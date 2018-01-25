const defaultState = {
  isLoading: false,
  error: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  centerList: [],
  allCenterList: [],
  pageItems: []
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
        centerList: action.data,
        allCenterList: action.data
      });
      break;
    case 'REQUEST_CENTERS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'FILTER_CENTERS_BY':
      currentState = Object.assign({}, state, {
        centerList: undefined
      }, {
        isLoading: false,
        error: false,
        centerList: action.data
      });
      break;
    case 'PAGINATE_CENTERS':
      currentState = Object.assign({}, state, {
        pageItems: state.centerList.slice(action.start, action.end)
      });
      break;
    default:
      currentState = state;
  }
  return currentState;
};

export default centers;
