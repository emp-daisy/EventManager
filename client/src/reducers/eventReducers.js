const defaultState = {
  isLoading: false,
  error: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  eventList: [],
  allEventList: [],
  pageItems: []
};

const events = (state = defaultState, action) => {
  let currentState;
  switch (action.type) {
    case 'REQUEST_EVENTS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'REQUEST_EVENTS_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: false,
        eventList: action.data,
        allEventList: action.data
      });
      break;
    case 'REQUEST_EVENTS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'REQUEST_USER_EVENTS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'REQUEST_USER_EVENTS_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: false,
        eventList: action.data,
        allEventList: action.data
      });
      break;
    case 'REQUEST_USER_EVENTS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'DELETE_EVENTS':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'DELETE_EVENTS_GRANTED':

      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false,
        eventList: state.eventList.filter(el => el.name !== action.id),
        allEventList: state.allEventList.filter(el => el.name !== action.id)
      });
      break;
    case 'DELETE_EVENTS_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'FILTER_EVENTS_BY':
      currentState = Object.assign({}, state, {
        eventList: undefined
      }, {
        isLoading: false,
        error: false,
        eventList: action.data
      });
      break;
    case 'PAGINATE_EVENTS':
      currentState = Object.assign({}, state, {
        pageItems: state.eventList.slice(action.start, action.end)
      });
      break;
    default:
      currentState = state;
  }
  return currentState;
};

export default events;
