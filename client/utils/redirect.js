const Router = require('next/router');

const redirect = (target, context = {}) => {
  if (process.browser) {
    Router.replace(target);
  } else {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  }
};

module.exports = {
  redirect,
};

