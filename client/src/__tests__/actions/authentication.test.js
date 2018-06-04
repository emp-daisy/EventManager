import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  logOut,
  login,
  register,
  forgottenPassword,
  resetPassword,
  getToken,
  isResetTokenValid,
  isUserAdmin
} from '../../actions/authentication';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('Authentication Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('Login', () => {
    it('it should execute registration with failed response', () => {
      fetchMock.postOnce('/v1/users/login', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'LOGIN_USER'
      }, {
        type: 'LOGIN_USER_FAILED'
      }];

      return store.dispatch(login('faker@fake.com', 'faker')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute registration with success response', () => {
      fetchMock.postOnce('/v1/users/login', {
        body: { token: 'token' },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'LOGIN_USER'
      }, {
        type: 'LOGIN_USER_GRANTED', data: { token: 'token' }
      }];

      return store.dispatch(login('faker@fake.com', 'faker')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute registration with no token response', () => {
      fetchMock.postOnce('/v1/users/login', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'LOGIN_USER'
      }, {
        type: 'LOGIN_USER_FAILED'
      }];

      return store.dispatch(login('faker@fake.com', 'faker')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute registration with unverified account', () => {
      fetchMock.postOnce('/v1/users/login', {
        body: { unverified: true },
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'LOGIN_USER'
      }, {
        type: 'LOGIN_USER_FAILED'
      }];

      return store.dispatch(login('faker@fake.com', 'faker')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute registration with 500 status code', () => {
      fetchMock.postOnce('/v1/users/login', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'LOGIN_USER'
      }, {
        type: 'LOGIN_USER_FAILED', msg: undefined
      }];

      return store.dispatch(login('faker@fake.com', 'faker')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('Registration', () => {
    it('it should execute registration with failed response', () => {
      fetchMock.postOnce('/v1/users', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REGISTER_USER'
      }, {
        type: 'REGISTER_USER_FAILED'
      }];

      return store.dispatch(register({ email: 'faker@fake.com', password: 'faker' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute registration with success response', () => {
      fetchMock.postOnce('/v1/users', {
        body: {},
        headers: {
          'content-type': 'application/json'
        },
        status: 201
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REGISTER_USER'
      }, {
        type: 'REGISTER_USER_GRANTED'
      }];

      return store.dispatch(register({ email: 'faker@fake.com', password: 'faker' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute registration with 500 status code', () => {
      fetchMock.postOnce('/v1/users', Promise.reject());
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'REGISTER_USER'
      }, {
        type: 'REGISTER_USER_FAILED', msg: 'Error registering user...'
      }];

      return store.dispatch(register({ email: 'faker@fake.com', password: 'faker' })).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should countdown on registration confirmation', () => {});
  });

  describe('Log out', () => {
    it('it should logout', () => {
      const expectedActions = [{
        type: 'LOGOUT_USER'
      }];
      store.dispatch(logOut());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Psssword reset', () => {
    it('it should execute password reset', () => {
      fetchMock.postOnce('/v1/users/reset/token123', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'RESET_PASSWORD'
      }, {
        type: 'RESET_PASSWORD_GRANTED'
      }];

      return store.dispatch(resetPassword({ password: 'faker', confirmPassword: 'faker' }, 'token123')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute password reset with failure', () => {
      fetchMock.postOnce('/v1/users/reset/token123', {
        body: { msg: 'Error' },
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'RESET_PASSWORD'
      }, {
        type: 'RESET_PASSWORD_FAILED', msg: 'Error'
      }];

      return store.dispatch(resetPassword({ password: 'faker', confirmPassword: 'faker' }, 'token123')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute password reset with 500 status code', () => {
      fetchMock.postOnce('/v1/users/reset/token123', {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'RESET_PASSWORD'
      }, {
        type: 'RESET_PASSWORD_FAILED', msg: 'Error registering user...'
      }];

      return store.dispatch(resetPassword({ password: 'faker', confirmPassword: 'faker' }, 'token123')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });

    it('it should execute password reset', () => {
      fetchMock.postOnce('/v1/users/reset', {
        body: {},
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'FORGOTTEN_PASSWORD'
      }, {
        type: 'FORGOTTEN_PASSWORD_GRANTED'
      }];

      return store.dispatch(forgottenPassword('faker@faker.com')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute password reset with failure', () => {
      fetchMock.postOnce('/v1/users/reset', {
        body: { msg: 'Error' },
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'FORGOTTEN_PASSWORD'
      }, {
        type: 'FORGOTTEN_PASSWORD_FAILED', msg: 'Error'
      }];

      return store.dispatch(forgottenPassword('faker@faker.com')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
    it('it should execute password reset with 500 status code', () => {
      fetchMock.postOnce('/v1/users/reset', {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      });
      const expectedActions = [{
        type: 'CLEAR_NOTIFICATION'
      }, {
        type: 'FORGOTTEN_PASSWORD'
      }, {
        type: 'FORGOTTEN_PASSWORD_FAILED', msg: 'Error resetting password...'
      }];

      return store.dispatch(forgottenPassword('faker@faker.com')).then(() => {
        expect(fetchMock.called()).toBe(true);
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });

  describe('Manage token', () => {
    it('it should check if reset token is invalid', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTI3MTgyMTQxLCJleHAiOjE1MjczNTQ5NDF9.we4lH5V-zCwD6VpH6grR9cPsbQRgm3_-GlP2tGMU54A';
      const expired = isResetTokenValid(token);
      expect(expired).toEqual(false);
    });
    it('it should check if reset token is invalid whden undefined', () => {
      const expired = isResetTokenValid();
      expect(expired).toEqual(false);
    });

    it('it should retrieve token', () => {
      getToken();
      expect(localStorage.getItem).toHaveBeenCalled();
    });

    it('it should check token is for admin and return false when it does not exist', () => {
      const admin = isUserAdmin();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(admin).toEqual(false);
    });
    it('it should check token is for admin and returns true', () => {
      global.localStorage.getItem = jest.fn().mockImplementation(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTI3MTgyMTQxLCJleHAiOjE1MjczNTQ5NDF9.we4lH5V-zCwD6VpH6grR9cPsbQRgm3_-GlP2tGMU54A');

      const admin = isUserAdmin();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(admin).toEqual(true);
    });
  });
});
