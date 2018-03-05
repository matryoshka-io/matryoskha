const axios = require('axios');
const nextRouter = require('next/router');
const sessions = require('./sessions');

const BASE_URL = 'http://localhost:3000';

const registerUser = (username, password) =>
  new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/auth/signup`, { username, password })
      .then((result) => {
        if (result.data.success) {
          sessions.setCookie('jwt', result.data.token);
        }
        return resolve(result.data);
      })
      .catch(err => reject(err.data));
  });

const loginUser = (username, password) =>
  new Promise((resolve, reject) => {
    return axios.post(`${BASE_URL}/auth/login`, { username, password })
      .then((result) => {
        if (result.success) {
          sessions.setCookie('jwt', result.token);
        }
        return resolve(result.data);
      })
      .catch((err) => {
        console.log(err);
        sessions.deleteCookie('jwt');
        return reject(err);
      });
  });

const makeTokenHeader = token => ({ headers: { 'x-access-token': token } });

const authenticateToken = token =>
  new Promise((resolve, reject) => {
    if (token) {
      const headers = makeTokenHeader(token);
      return axios.post(`${BASE_URL}/auth/authenticate`, {}, headers)
        .then(result => resolve(result.data))
        .catch((err) => {
          sessions.deleteCookie('jwt');
          return reject(err.data);
        });
    }
    return resolve({
      session: false,
    });
  });

const initializeSession = context =>
  new Promise((resolve, reject) => {
    const token = sessions.getToken('jwt', context.req);
    const sessionData = {
      user: null,
      token: null,
    };
    authenticateToken(token)
      .then((result) => {
        if (result.session) {
          sessionData.user = result.content.user;
          sessionData.token = result.token;
          sessions.setCookie('jwt', result.token);
        } else {
          sessions.deleteCookie('jwt');
        }
        return resolve(sessionData);
      })
      .catch(err => reject(sessionData));
  });

module.exports = {
  registerUser,
  loginUser,
  makeTokenHeader,
  authenticateToken,
  initializeSession,
};
