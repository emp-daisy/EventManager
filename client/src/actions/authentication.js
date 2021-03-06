import jwtDecode from 'jwt-decode';
import URLSearchParams from 'url-search-params';
import { API_URL } from '../store/setupStore';
import history from './history';
import { addNotification, connectionError, validationError } from './notify';

const saveToken = (token) => {
  localStorage.setItem('jwt-token', token);
};

const removeToken = () => {
  localStorage.removeItem('jwt-token');
};
const futureDate = date => new Date() < date;

const checkTokenExpiry = () => {
  const jwt = localStorage.getItem('jwt-token');
  if (jwt) {
    const jwtExp = jwtDecode(jwt).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    return futureDate(expiryDate);
  }
  removeToken();
  return false;
};

export const isResetTokenValid = (token) => {
  try {
    const jwtExp = jwtDecode(token).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    return futureDate(expiryDate);
  } catch (err) {
    return false;
  }
};

export const getToken = () => {
  checkTokenExpiry();
  return localStorage.getItem('jwt-token');
};

export const isUserAdmin = () => {
  const jwt = getToken();
  if (jwt) {
    const admin = jwtDecode(jwt).isAdmin;
    return admin;
  }
  return false;
};

export const login = (email, password) => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'LOGIN_USER' });

  const payload = new URLSearchParams();
  payload.set('email', email);
  payload.set('password', password);
  return fetch(`${API_URL}users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  })
    .then(res => res.json())
    .then((data) => {
      if (data.token) {
        saveToken(data.token);
        dispatch({ type: 'LOGIN_USER_GRANTED', data });
        history.replace('/dashboard');
      } else {
        if (data.unverified) {
          dispatch(addNotification({
            message: 'Verify account now',
            level: 'warning',
            autoDismiss: 0,
            action: {
              label: 'Re-Send link',
              callback: () => {
                fetch(`${API_URL}users/verify`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: payload
                }).then(() => {
                  dispatch({ type: 'CLEAR_NOTIFICATION' });
                  dispatch(addNotification({
                    message: 'Check email to verify',
                    level: 'success',
                    autoDismiss: 20
                  }));
                });
              }
            }
          }));
        }
        dispatch({ type: 'LOGIN_USER_FAILED', msg: data.msg });
      }
    }, err => dispatch({ type: 'LOGIN_USER_FAILED', msg: err }));
};

export const register = credientials => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'REGISTER_USER' });

  const payload = new URLSearchParams();
  payload.set('firstName', credientials.firstname);
  payload.set('surname', credientials.lastname);
  payload.set('email', credientials.email);
  payload.set('password', credientials.password);
  payload.set('confirmPassword', credientials.passwordconfirm);

  return fetch(`${API_URL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  }).then(res => res)
    .then((response) => {
      const data = response.json();
      if (response.status === 201) {
        dispatch({ type: 'REGISTER_USER_GRANTED' });
        dispatch(addNotification({
          message: 'Registration successful. CHECk EMAIL TO VERIFY',
          level: 'success',
          autoDismiss: 20
        }));
      } else {
        dispatch({ type: 'REGISTER_USER_FAILED' });
        data.then((res) => {
          connectionError(dispatch, validationError(res));
        });
      }
    })
    .catch(() => {
      dispatch({ type: 'REGISTER_USER_FAILED', msg: 'Error registering user...' });
      connectionError(dispatch);
    });
};

export const forgottenPassword = email => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'FORGOTTEN_PASSWORD' });

  const payload = new URLSearchParams();
  payload.set('email', email);
  return fetch(`${API_URL}users/reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  })
    .then(resBody => resBody.json()
      .then(v => (
        {
          status: resBody.status,
          data: v
        }
      )))
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'FORGOTTEN_PASSWORD_GRANTED' });
        dispatch(addNotification({
          message: 'Check your email to continue',
          level: 'success',
          autoDismiss: 15
        }));
      } else {
        dispatch({ type: 'FORGOTTEN_PASSWORD_FAILED', msg: response.data.msg });
      }
    }, () => {
      dispatch({ type: 'FORGOTTEN_PASSWORD_FAILED', msg: 'Error resetting password...' });
      connectionError(dispatch);
    });
};

export const resetPassword = (credientials, token) => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'RESET_PASSWORD' });
  const payload = new URLSearchParams();
  payload.set('password', credientials.password);
  payload.set('confirmPassword', credientials.passwordconfirm);
  return fetch(`${API_URL}users/reset/${token}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  })
    .then(resBody => resBody.json()
      .then(v => (
        {
          status: resBody.status,
          data: v
        }
      )))
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: 'RESET_PASSWORD_GRANTED' });
        history.replace('/login');
        dispatch(addNotification({
          message: 'Password reset successful',
          level: 'success',
          autoDismiss: 10
        }));
      } else {
        dispatch(addNotification({
          message: res.data.msg,
          level: 'error',
          autoDismiss: 0
        }));
        dispatch({ type: 'RESET_PASSWORD_FAILED', msg: res.data.msg });
      }
    }, () => {
      dispatch({ type: 'RESET_PASSWORD_FAILED', msg: 'Error registering user...' });
      connectionError(dispatch);
    });
};

export const logOut = () => (dispatch) => {
  removeToken();
  dispatch({ type: 'LOGOUT_USER' });
};

export const clearNotification = () => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'CLEAR_MESSAGE' });
};
