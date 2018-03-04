const request = require('superagent');

test('seed data: admin\'s homepage should be populated (despite having no subscriptions)', (done) => {
  request
    .get('http://localhost:3000/api/')
    .end((err, res) => {
      expect(res.body.length).toBeGreaterThan(0);
      done();
    });
});

test('seed data: admin\'s homepage should contain 6 posts', (done) => {
  request
    .get('http://localhost:3000/api/')
    .end((err, res) => {
      expect(res.body.length).toBe(6);
      done();
    });
});

test('seed data: admin should have voted on the top post', (done) => {
  request
    .get('http://localhost:3000/api/')
    .end((err, res) => {
      expect(res.body[0].voted).toBe(1);
      done();
    });
});