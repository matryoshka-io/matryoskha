const supertest = require('supertest');
const request = supertest('http://localhost:3000');

test('get homepage as "admin"', () => {
  request
    .get('/api/')
    .end((err, res) => {
      console.log(res);
    });
});