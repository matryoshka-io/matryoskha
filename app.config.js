let BASE_URL;
let MONGO_URI;
const APP_IMAGE = 'stacking';
const DB_IMAGE = 'mongo';

console.log(`CONFIG FOR: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'production') {
  BASE_URL = `http://${APP_IMAGE}:3000`;
  MONGO_URI = `mongodb://${DB_IMAGE}:27017/matryoksha`;
} else {
  BASE_URL = 'http://localhost:3000';
  MONGO_URI = 'mongodb://localhost:27017/matryoksha';
}

module.exports = {
  BASE_URL,
  MONGO_URI,
};
