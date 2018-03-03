const commentTests = require('../commentsTest')

const addComment = commentTests.addComment;

const data = {
  _id: "5a8e0e2b7f911450d4600d99",
  subreddit: {
    _id: "5a8e0e217f911450d4600d98",
    creator: "5a8e0e077f911450d4600d96",
    description: "Share cat photos here.",
    title: "Cats",
    date: "2018-02-21T23:51:42.095Z",
    titleSlug: "cats",
    __v: 0
  },
  title: "Why I like my cat!",
  type: "Text",
  body: "My cat can build full-stack apps.",
  author: {
    _id: "5a8e0e077f911450d4600d96",
    username: "admin",
    password: "$2a$10$LrXgT6RHb9Q0fUIOlr3/i.xmmGF1H5bisTnylD1zYyMelo3miE/ZK",
    date: "2018-02-21T23:49:20.395Z",
    karma: 0,
    salt: "$2a$10$LrXgT6RHb9Q0fUIOlr3/i.",
    __v: 0
  },
  date: "2018-02-21T23:54:30.546Z",
  titleSlug: "why-i-like-my-cat",
  __v: 0,
  karma: 0,
  comments: [
    {
      _id: "5a8e0e367f911450d4600d9a",
      type: "Comment",
      body:
        "Sounds like a really smart cat, checkout Next.js by the way. It's the new big thing.",
      author: "5a8e0e0b7f911450d4600d97",
      date: "2018-02-21T23:58:33.480Z",
      parent: "5a8e0e2b7f911450d4600d99",
      __v: 0,
      karma: 1,
      comments: [
        {
          _id: "5a8e0e3f7f911450d4600d9b",
          type: "Comment",
          body: "Will definitely check it out.",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-02-21T23:59:43.960Z",
          parent: "5a8e0e367f911450d4600d9a",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a99eee3c882652b09601a5b",
          body: "a",
          type: "Comment",
          parent: "5a8e0e367f911450d4600d9a",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:40:03.381Z",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a99efe6c882652b09601a5d",
          body: "a",
          type: "Comment",
          parent: "5a8e0e367f911450d4600d9a",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:44:22.908Z",
          __v: 0,
          karma: 0,
          comments: []
        }
      ]
    },
    {
      _id: "5a99ed67c882652b09601a52",
      type: "Comment",
      body: "hi",
      parent: "5a8e0e2b7f911450d4600d99",
      author: "5a8e0e077f911450d4600d96",
      date: "2018-03-03T00:33:43.147Z",
      __v: 0,
      karma: 0,
      comments: [
        {
          _id: "5a99ed6ac882652b09601a53",
          body: "1",
          type: "Comment",
          parent: "5a99ed67c882652b09601a52",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:33:46.932Z",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a99edd9c882652b09601a58",
          body: "2",
          type: "Comment",
          parent: "5a99ed67c882652b09601a52",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:35:37.316Z",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a99ee63c882652b09601a59",
          body: "3",
          type: "Comment",
          parent: "5a99ed67c882652b09601a52",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:37:55.000Z",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a99eedfc882652b09601a5a",
          body: "4",
          type: "Comment",
          parent: "5a99ed67c882652b09601a52",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:39:59.777Z",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a99eeeac882652b09601a5c",
          body: "a",
          type: "Comment",
          parent: "5a99ed67c882652b09601a52",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T00:40:10.523Z",
          __v: 0,
          karma: 0,
          comments: []
        },
        {
          _id: "5a9a0ecac882652b09601a5e",
          body: "3",
          type: "Comment",
          parent: "5a99ed67c882652b09601a52",
          author: "5a8e0e077f911450d4600d96",
          date: "2018-03-03T02:56:10.591Z",
          __v: 0,
          karma: 0,
          comments: []
        }
      ]
    },
    {
      _id: "5a9a108fc882652b09601a5f",
      type: "Comment",
      body: "",
      parent: "5a8e0e2b7f911450d4600d99",
      author: "5a8e0e077f911450d4600d96",
      date: "2018-03-03T03:03:43.770Z",
      __v: 0,
      karma: 0,
      comments: []
    }
  ]
};

test('should add to child post', () => {
  const actual = addComment(commentTwo, 2, commentThree)
  const result = { ...commentTwo, comments: [commentOne, commentThree] }
  expect(actual).toEqual(result)
})


// test('should add child within a child', () => {
//   const actual = addComment(root, 3, commentOne)
//   const result = {
//     ...root, comments: [commentTwo,
//       {
//         id: 3,
//         content: 'I am comment three',
//         comments: [commentOne],
//       }
//     ]
//   }
//   expect(actual).toEqual(result)
// })