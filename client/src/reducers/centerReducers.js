const defaultState = {
  isLoading: false,
  error: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  allCenterList: [],
  paginationMeta: {}
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
        allCenterList: action.data.centers,
        paginationMeta: action.data.meta.pagination
      });
      break;
    case 'REQUEST_CENTERS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'DELETE_CENTERS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'DELETE_CENTERS_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false,
        allCenterList: state.allCenterList.filter(el => el.id.toString() !== action.id.toString())
      });
      break;
    case 'DELETE_CENTERS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'CREATE_CENTERS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'CREATE_CENTERS_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false,
        allCenterList: [...state.allCenterList, action.newData]
      });
      break;
    case 'CREATE_CENTERS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'UPDATE_CENTERS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'UPDATE_CENTERS_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false,
        allCenterList: state.allCenterList.map((item) => {
          if (item.id === action.newData.id) { return Object.assign({}, item, action.newData); }
          return item;
        })
      });
      break;
    case 'UPDATE_CENTERS_FAILED':
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
};

export default centers;
