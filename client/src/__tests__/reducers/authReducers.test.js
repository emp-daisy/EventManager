import authentication from '../../reducers/authReducers';

describe('Authentication Reducer', () => {
  it('should return the initial state', () => {
    expect(authentication(undefined, {})).toEqual({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    });
  });

  it('should create an action to login', () => {
    const actionObject = {
      type: 'LOGIN_USER'
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action for failed login', () => {
    const actionObject = {
      type: 'LOGIN_USER_FAILED',
      msg: 'Failed login'
    };
    expect(authentication({
      isLoading: true,
      isLoggedIn: true,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoggedIn: false,
      isLoading: false,
      error: true,
      errorMessage: actionObject.msg
    });
  });

  it('should create an action for granted login', () => {
    const actionObject = {
      type: 'LOGIN_USER_GRANTED'
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: true,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoggedIn: true,
      isLoading: false,
      error: false
    });
  });

  it('should create an action for registering user', () => {
    const actionObject = {
      type: 'REGISTER_USER'
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoading: true,
      error: false
    });
  });

  it('should create an action for failed registration', () => {
    const actionObject = {
      type: 'REGISTER_USER_FAILED'
    };
    expect(authentication({
      isLoading: true,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoading: false,
      error: true
    });
  });

  it('should create an action for granted registration', () => {
    const actionObject = {
      type: 'REGISTER_USER_GRANTED'
    };
    expect(authentication({
      isLoading: true,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoading: false,
      success: true
    });
  });

  it('should create an action to verify unauthenticated user', () => {
    const actionObject = {
      type: 'UNAUTHENTICATED_USER'
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoggedIn: false,
      isLoading: false,
      error: false
    });
  });

  it('should create an action for logout', () => {
    const actionObject = {
      type: 'LOGOUT_USER'
    };
    expect(authentication({
      isLoading: true,
      isLoggedIn: true,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      isLoggedIn: false
    });
  });

  it('should create an action for increasing timer', () => {
    const actionObject = {
      type: 'INC_TIMER',
      time: 10
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      countDown: 10
    });
  });

  it('should create an action for decreasing timer', () => {
    const actionObject = {
      type: 'DEC_TIMER'
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: false,
      sucessMessage: '',
      countDown: 10
    }, actionObject)).toMatchObject({
      countDown: 9
    });
  });

  it('should create an action to clear messages', () => {
    const actionObject = {
      type: 'CLEAR_MESSAGE'
    };
    expect(authentication({
      isLoading: false,
      isLoggedIn: false,
      username: '',
      error: false,
      errorMessage: '',
      success: true,
      sucessMessage: '',
      countDown: 0
    }, actionObject)).toMatchObject({
      success: false
    });
  });
});
