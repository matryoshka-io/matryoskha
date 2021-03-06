const axios = require('axios');
const nextRouter = require('next/router');
const sessions = require('./sessions');
const profile = require('./profile');

const { BASE_URL } = require('../../app.config');

const registerUser = (username, password) =>
  new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/auth/signup`, { username, password })
      .then((result) => {
        if (result.data.success) {
          console.log(`REGISTERED USER: ${result.data.user.username}`);
          sessions.setCookie('jwt', result.data.token);
          console.log(`TOKEN SET: ${sessions.getToken('jwt') !== undefined}`);
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
          console.log(`LOGGED IN USER: ${result.user.username}`);
          sessions.setCookie('jwt', result.token);
          console.log(`TOKEN SET: ${sessions.getToken('jwt') !== undefined}`);
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
      .catch(err => resolve(sessionData));
  });

module.exports = {
  registerUser,
  loginUser,
  makeTokenHeader,
  authenticateToken,
  initializeSession,
};
