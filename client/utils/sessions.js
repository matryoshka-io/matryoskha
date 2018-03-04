const axios = require('axios');
const cookie = require('js-cookie');

const auth = require('./auth');

const { BASE_URL } = require('../../app.config');

const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value);
  }
};

const deleteCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

const getBrowserCookie = (key) => {
  return cookie.get(key);
};

const getServerCookie = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

const getToken = (key, req) => {
  return process.browser ? getBrowserCookie(key) : getServerCookie(key, req);
};

module.exports = {
  setCookie,
  deleteCookie,
  getToken,
};

