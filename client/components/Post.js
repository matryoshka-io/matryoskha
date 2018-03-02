import Link from 'next/link';
import moment from 'moment';

import PostDetails from './PostDetails';
import Rating from './Rating';
import SubredditBar from './SubredditBar';

const Post = ({ _id, type, author, subreddit, title, titleSlug, karma, date }) => {
  const image = 'default.jpg'; // need image defaults by post type, image in backend response
  const postImageStyle = {
    background: `url(/static/${image}) top center no-repeat`,
    backgroundSize: 'cover',
    backgroundColor: '#333',
  };

  return (
    <div className="post__tile">
      <div className="post__karma">
        <div className="post__vote">&#x25B2;</div>
        <div>{karma}</div>
        <div className="post__vote">&#x25BC;</div>
      </div>
      <div className="post__image" style={postImageStyle} />
      <div className="post__content">
        <h3><Link href={`/p/${_id}`}><a>{title}</a></Link></h3>
        <div className="post__meta">
          <ul>
            <li>submitted {moment(subreddit.date).fromNow()}</li>
            <li>by <Link href={`/u/${author.username}`}><a>{author.username}</a></Link></li>
            <li>to <Link href={`/r/${subreddit.titleSlug}`}><a>{`/r/${subreddit.titleSlug}`}</a></Link></li>
          </ul>
        </div>
        <div className="post__actions">
          <ul>
            <li>
              <Link href={`/r/${subreddit.titleSlug}/${titleSlug}`}><a>Comments</a></Link>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          .post__tile {
            display: flex;
            flex-flow: row;
            height: 80px;
            padding: 8px;
          }
          .post__karma {
            width: 30px;
            height: 80px;
            padding-top: 8px;
            margin-right: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .post__karma > * {
            flex: 1;
          }
          .post__vote {
            text-decoration: none;
          }
          .post__image {
            width: 80px;
            height: 80px;
            margin-right: 8px;
          }
          .post__content {
            flex: 6 auto;
            display: flex;
            flex-direction: column;
            align-content: space-around;
          }
          .post__content > * {
            flex: 1 auto;
          }
          .post__content h3 {
            color: #000;
            margin-top: 0px;
            margin-bottom: 8px;
          }
          .post__content a {
            cursor: pointer;
            font-weight: 700;
          }
          .post__content a:hover {
            color: #ffcc00;
          }
          .post__meta, .post__actions {
            float: left;
            display: inline-block;
            clear: right;
          }
          .post__meta ul, .post__actions ul {
            display: inline;
            list-style-type: none;
            height: 24px;
            margin-left: 8px;
            margin-bottom: 8px;
          }
          .post__meta li, .post__actions li {
            float: left;
            margin-right: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default Post;

/*
[ { _id: '5a8e31c49bc60f57d0051c11',
    subreddit:
     { _id: '5a8e0e217f911450d4600d98',
       creator: '5a8e0e077f911450d4600d96',
       description: 'Share cat photos here.',
       title: 'Cats',
       date: '2018-02-21T23:51:42.095Z',
       __v: 0 },
    title: 'Cats are better than dogs',
    type: 'Text',
    body: 'Cats are more independent than dogs',
    author:
     { _id: '5a8e0e0b7f911450d4600d97',
       username: 'test',
       password: 'alligator1515',
       date: '2018-02-21T23:57:10.585Z',
       karma: 0,
       __v: 0 },
    date: '2018-02-22T03:00:15.847Z',
    __v: 0,
    karma: 1,
    comments: [] },
  { _id: '5a8e0e2b7f911450d4600d99',
    subreddit:
     { _id: '5a8e0e217f911450d4600d98',
       creator: '5a8e0e077f911450d4600d96',
       description: 'Share cat photos here.',
       title: 'Cats',
       date: '2018-02-21T23:51:42.095Z',
       __v: 0 },
    title: 'Why I like my cat!',
    type: 'Text',
    body: 'My cat can build full-stack apps.',
    author:
     { _id: '5a8e0e077f911450d4600d96',
       username: 'admin',
       password: 'admin',
       date: '2018-02-21T23:49:20.395Z',
       karma: 0,
       __v: 0 },
    date: '2018-02-21T23:54:30.546Z',
    __v: 0,
    karma: 0,
    comments: [ [Object] ] } ]
*/