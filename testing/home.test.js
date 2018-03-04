const request = require('superagent');

test('get homepage as "admin"', () => {
  request
    .get('http://localhost:3000/api/')
    .end((err, res) => {
      console.log(res.body);
    });
});