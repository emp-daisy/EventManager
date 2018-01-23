import jwtDecode from 'jwt-decode';
import URLSearchParams from 'url-search-params';
import { API_URL } from '../store/setupStore';
import { history } from './history';

export const login = (email, password) => (dispatch) => {
  dispatch({ type: 'LOGIN_USER' });

  const payload = new URLSearchParams();
  payload.set('email', email);
  payload.set('password', password);
  fetch(`${API_URL}users/login`, {
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
        dispatch({ type: 'LOGIN_USER_FAILED', msg: data.msg });
      }
    }, err => dispatch({ type: 'LOGIN_USER_FAILED', msg: err }));
};

export const register = credientials => (dispatch) => {
  dispatch({ type: 'REGISTER_USER' });

  const payload = new URLSearchParams();
  payload.set('firstName', credientials.firstname);
  payload.set('surname', credientials.lastname);
  payload.set('email', credientials.email);
  payload.set('password', credientials.password);
  payload.set('confirmPassword', credientials.passwordconfirm);

  fetch(`${API_URL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  }).then(res => res)
    .then((response) => {
      const data = response.json();
      if (data.status === 201) {
        dispatch({ type: 'REGISTER_USER_GRANTED', msg: data.msg });
        dispatch({ type: 'INC_TIMER', time: 5 });
        const counter = Array.from(new Array(5), () => countDown(dispatch));
        return counter.reduce((promiseChain, currentTask) => promiseChain.then(currentTask), Promise.resolve());
      }
      let message = data.msg;
      if (data.errors) {
        message = Object
          .values(data.errors)
          .join('\n');
      }
      dispatch({ type: 'REGISTER_USER_FAILED', msg: message });
      return false;
    }).then((success) => {
      if (success) {
        history.replace('/login');
        dispatch({ type: 'CLEAR_MESSAGE' });
      }
    })
    .catch((error) => {
      dispatch({
        type: 'REGISTER_USER_FAILED',
        msg: error.msg
          ? error.msg
          : error
      });
    });
};

export const logOut = () => (dispatch) => {
  removeToken();
  dispatch({ type: 'LOGOUT_USER' });
};

export const getToken = () => {
  checkTokenExpiry();
  return localStorage.getItem('jwt-token');
};

const saveToken = (token) => {
  localStorage.setItem('jwt-token', token);
};

const removeToken = () => {
  localStorage.removeItem('jwt-token');
};

const checkTokenExpiry = () => {
  const jwt = localStorage.getItem('jwt-token');
  if (jwt) {
    const jwtExp = jwtDecode(jwt).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if (new Date() < expiryDate) {
      return true;
    }
  }
  removeToken();
  return false;
};

export const isUserAdmin = () => {
  const jwt = getToken();
  if (jwt) {
    const admin = jwtDecode(jwt).isAdmin;
    return admin;
  }
  return false;
};

const countDown = dispatch => new Promise((resolve) => {
  setTimeout(() => {
    dispatch({ type: 'DEC_TIMER' });
    resolve();
  }, 1000);
});
