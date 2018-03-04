const axios = require('axios');

const { BASE_URL } = require('./config');


const getUserProfile = (username) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${BASE_URL}/api/user/${username}`)
      .then(profile => resolve(profile.data))
      .catch(err => reject(err));
  });
};

const getUserContent = (username, content) => {
  return new Promise((resolve, reject) => {
    const requestUrl = `${BASE_URL}/api/user/${username}/${content}`;
    console.log(`PROFILE CONTENT: ${requestUrl}`);
    return axios.get(`${BASE_URL}/api/user/${username}/${content}`)
      .then((content) => {
        console.log(content.data);
        return resolve(content.data);
      })
      .catch(err => reject(err));
  });
};

const initializeProfilePage = (context) => {
  const user = context.query.user || null;
  const contentType = context.query.content || 'posts';
  const response = {
    user,
    profile: {},
    content: [],
    type: contentType,
  };
  if (user) {
    return new Promise((resolve, reject) => {
      return getUserProfile(user)
        .then((profile) => {
          response.profile = profile;
          return getUserContent(user, contentType);
        })
        .then((content) => {
          response.content = content;
          return resolve(response);
        })
        .catch(err => reject(err));
    });
  }
  return response;
};

module.exports = {
  initializeProfilePage,
};
