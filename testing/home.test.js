const request = require('superagent');

test('get homepage as "admin"', (done) => {
  request
    .get('http://localhost:3000/api/')
    .end((err, res) => {
      expect(res.body.length).toBeGreaterThan(0);
      done();
    });
});