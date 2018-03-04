module.exports = {
  testMatch: [ '**/testing/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)' ],
  testPathIgnorePatterns: ["/node_modules/", "__tests__"], // Next.js had their own tests so this is to ignore their folder.
};
