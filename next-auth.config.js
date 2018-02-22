require('dotenv').load();
const db = require('./server/database');

const nextAuthProviders = require('./next-auth.providers');
const nextAuthFunctions = require('./next-auth.functions');

// If we want to pass a custom session store then we also need to pass an
// instance of Express Session along with it.
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)

// If no store set, NextAuth defaults to using Express Sessions in-memory
// session store (the fallback is intended as fallback for testing only).
let sessionStore = new MongoStore({
     mongooseConnection: db,
     autoRemove: 'interval',
     autoRemoveInterval: 10, // Removes expired sessions every 10 minutes
     collection: 'sessions',
     stringify: false
  });


module.exports = () => {
  // We connect to the User DB before we define our functions.
  // next-auth.functions.js returns an async method that does that and returns
  // an object with the functions needed for authentication.
  return nextAuthFunctions().then(functions => {
    return new Promise((resolve, reject) => {
      // This is the config block we return, ready to be passed to NextAuth
      resolve({ // Secret used to encrypt session data on the server.
        sessionSecret: "{c=%&_.B/Od**E6]WeD<*7-s3;>h#I{L!ucW:tvdgwQ6RFy%{mi17K(Wvjbn<<wS",
        sessionMaxAge: 60000 * 60 * 24 * 7, sessionRevalidateAge: 60000, serverUrl: process.env.SERVER_URL || null, // Add an Express Session store.
        expressSession: expressSession, sessionStore: sessionStore, // Define oAuth Providers
        providers: nextAuthProviders(), // Define functions for manging users and sending email.
        functions: functions });
    });
  });
};