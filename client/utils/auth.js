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
      .catch((err) => {
        console.log('error from auth.register ', err);
        return reject(err.data);
      });
  });

const loginUser = (username, password) => {
  axios.post(`${BASE_URL}/auth/login`, { username, password })
    .then((result) => {
      console.log('login: ', result);
      if (result.success) {
        sessions.setCookie('jwt', result.token);
      }
      return result;
    })
    .catch(err => err);
};

const makeTokenHeader = (token) => {
  let headers = null;
  if (token) {
    headers = { headers: { 'x-access-token': token } };
  }
  return headers;
};

const authenticateToken = (token) => {
  return new Promise((resolve, reject) => {
    const headers = makeTokenHeader(token);
    return axios.post(`${BASE_URL}/auth/authenticate`, {}, headers)
      .then(result => resolve(result.data))
      .catch((err) => {
        sessions.deleteCookie('jwt');
        return reject(err.data);
      });
  });
};


module.exports = {
  registerUser,
  loginUser,
  makeTokenHeader,
  authenticateToken,
};
