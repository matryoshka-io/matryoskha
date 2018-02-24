const axios = require('axios');
const nextRouter = require('next/router');
const sessions = require('./sessions');

const BASE_URL = 'http://localhost:3000';

const registerUser = (username, password) =>
  new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/auth/signup`, { username, password })
      .then((result) => {
        if (result.success) {
          sessions.setCookie('jwt', result.token);
        }
        return resolve(result);
      })
      .catch(err => reject(err));
  });


const loginUser = (username, password) => {
  axios.post(`${BASE_URL}/auth/login`, { username, password })
    .then((result) => {
      if (result.success) {
        sessions.setCookie('jwt', result.token);
      }
      return result;
    })
    .catch(err => err);
};

const makeTokenHeader = (req) => {
  const token = sessions.getCookie('jwt', req);
  let headers = null;
  if (token) {
    headers = { headers: { 'x-access-header': token } };
  }
  return headers;
};

module.exports = {
  registerUser,
  loginUser,
  makeTokenHeader,
};
