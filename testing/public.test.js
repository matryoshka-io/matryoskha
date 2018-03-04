const request = require('superagent');

test('GET /r/Cats', (done) => {
  request
    .get('http://localhost:3000/api/sub/cats') // slugified and lowercased title
    .end((err, res) => {
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body.length).toBe(4);
      done();
    });
});

test('GET post by ID', (done) => {
  request
    .get('http://localhost:3000/api/post/5a8e31c49bc60f57d0051c11')
    .end((err, res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.karma).toBe(1);
      expect(res.body.voted).toBe(1);
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