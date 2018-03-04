const request = require('superagent');

const ken = '5a8e0e077f911450d4600d96' // ken's id, as per seed data

let post;
let comment;

test('make a subreddit', (done) => {
  request
    .post('http://localhost:3000/api/sub')
    .send({
      title: 'Next.js',
      description: 'discuss Next.js, plz respect our mods',
    })
    .end((err, res) => {
      expect(res.body).toBeTruthy();
      expect(res.body.creator).toBe(ken);
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
      post = res.body._id;
      expect(res.body).toBeTruthy();
      expect(res.body.author).toBe(ken);
      expect(res.body.titleSlug).toBe('nextjs');
      done();
    });
});

test('comment on a post', (done) => {
  request
    .post(`http://localhost:3000/api/post/${post}`)
    .send({
      body: 'boooooo',
    })
    .end((err, res) => {
      comment = res.body._id;
      expect(res.body).toBeTruthy();
      expect(res.body.author).toBe(ken);
      expect(res.body.body).toBe('boooooo'); // DRY...
      done();
    });
});

test('comment on a comment', (done) => {
  request
    .post(`http://localhost:3000/api/comment/${comment}`)
    .send({
      body: 'i\'m back!',
    })
    .end((err, res) => {
      comment = res.body._id;
      expect(res.body).toBeTruthy();
      expect(res.body.author).toBe(ken);
      expect(res.body.body).toBe('i\'m back!'); // DRY, DRY...
      done();
    });
});