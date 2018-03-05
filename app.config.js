const APP_IMAGE = 'stacking';
const DB_IMAGE = 'mongo';

let BASE_URL = 'http://localhost:3000';
let MONGO_URI = 'mongodb://localhost:27017/matryoksha';

console.log(`CONFIG FOR: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  // BASE_URL = 'https://matryoskha.tech/';
  BASE_URL = 'http://matryoshka.tech';
  MONGO_URI = `mongodb://${DB_IMAGE}/matryoksha`;
}

module.exports = {
  BASE_URL,
  MONGO_URI,
};
