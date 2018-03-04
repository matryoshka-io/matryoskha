const request = require('superagent');

test('make a subreddit', (done) => {
  request
    .post('http://localhost:3000/api/sub')
    .send({
      title: 'Next.js',
      description: 'discuss Next.js, plz respect our mods',
    })
    .end((err, res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.creator).toBe('5a8e0e077f911450d4600d96'); // this is ken's id
      expect(res.body.titleSlug).toBe('nextjs');
      done();
    });
});

test('post in a subreddit', (done) => {
  request
    .post('http://localhost:3000/api/sub/nextjs')
    .send({
      title: 'Next.js',
      type: 'Text',
      description: 'First post!',
    })
    .end((err, res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.author).toBe('5a8e0e077f911450d4600d96');
      expect(res.body.titleSlug).toBe('nextjs');
      done();
    });
});