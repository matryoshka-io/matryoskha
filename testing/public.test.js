const request = require('superagent');

test('get /r/cats', (done) => {
  request
    .get('http://localhost:3000/api/sub/cats') // slugified and lowercased title
    .end((err, res) => {
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body.length).toBe(4);
      done();
    });
});

test('get post by id', (done) => {
  request
    .get('http://localhost:3000/api/post/5a8e31c49bc60f57d0051c11')
    .end((err, res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.karma).toBe(1);
      expect(res.body.voted).toBe(1);
      done();
    });
});

test('get comment by id', (done) => {
  request
    .get('http://localhost:3000/api/comment/5a8e0e367f911450d4600d9a')
    .end((err, res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.karma).toBe(1);
      expect(res.body.voted).toBe(1);
      done();
    });
});