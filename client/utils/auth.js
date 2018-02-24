const axios = require('axios');
const nextRouter = require('next/router');
const sessions = require('./sessions');

const BASE_URL = 'http://localhost:3000';

const registerUser = (username, password) => {
  axios.post(`${BASE_URL}/auth/signup`, { username, password })
    .then((result) => {
      if (result.success) {
        sessions.setToken('json-token', result.token);
        nextRouter.replace('/');
      }
      nextRouter.replace('/auth/register');
    })
    .catch(err => err.message);
};

module.exports = {
  registerUser,
};
