const defaultState = {
  isLoading: false,
  isLoggedIn: false,
  username: '',
  error: false,
  errorMessage: '',
  success: false,
  sucessMessage: '',
  countDown: 0
};

const authentication = (state = defaultState, action) => {
  let currentState;
  switch (action.type) {
    case 'LOGIN_USER':
      currentState = Object.assign({}, state, {
        isLoading: true,
        error: false
      });
      break;
    case 'LOGIN_USER_FAILED':
      currentState = Object.assign({}, state, {
        isLoggedIn: false,
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'LOGIN_USER_GRANTED':
      currentState = Object.assign({}, state, {
        isLoggedIn: true,
        isLoading: false,
        error: false
      });
      break;
    case 'LOGOUT_USER':
      currentState = Object.assign({}, state, {isLoggedIn: false});
      break;
    case 'REGISTER_USER':
      currentState = Object.assign({}, state, {isLoading: true});
      break;
    case 'REGISTER_USER_FAILED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: true,
        errorMessage: action.msg
      });
      break;
    case 'REGISTER_USER_GRANTED':
      currentState = Object.assign({}, state, {
        isLoading: false,
        error: false,
        success: true,
        successMessage: action.msg
      });
      break;
    case 'CLEAR_MESSAGE':
      currentState = Object.assign({}, state, {success: false});
      break;
    case 'INC_TIMER':
      currentState = Object.assign({}, state, {countDown: action.time});
      break;
    case 'DEC_TIMER':
      currentState = Object.assign({}, state, {
        countDown: state.countDown - 1
      });
      break;
    default:
      currentState = state;
  }
  return currentState;
}

export default authentication;
