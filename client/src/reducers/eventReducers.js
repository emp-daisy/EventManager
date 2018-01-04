const defaultState = {
  isLoading: false,
  error: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  eventList: [],
  allEventList: []
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
    case 'FILTER_EVENTS_BY':
      currentState = Object.assign({}, state, {
        eventList: undefined
      }, {
        isLoading: false,
        error: false,
        eventList: action.data
      });;
      break;
    default:
      currentState = state;
  }
  return currentState;
}

export default events;
