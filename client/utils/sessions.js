const cookie = ('js-cookie');

const initSession = () => {
  let token = getToken('')
  //  if no, session doesn't exist, return empty user
  //  if yes, authenticate
};

const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1, path: '/' });
  }
};

const deleteCookie = (key) => {
  cookie.remove(key);
};

const getBrowserCookie = (key) => {

};

const getServerToken = (req) => {

};

const getToken = (key, req) => {
  return process.browser ? getBrowserToken(key) : getServerToken(key, req);
};

module.exports = {
  setToken,
  deleteToken,
  getToken,
};
