import Link from 'next/link';
import moment from 'moment';

import PostDetails from './PostDetails';
import Rating from './Rating';
import SubredditBar from './SubredditBar';

const Post = ({ _id, type, author, subreddit, title, titleSlug, karma, date, castVote }) => {
  const postImageStyle = {
    backgroundSize: 'cover',
    backgroundColor: '#333',
  };

  return (
    <div className="post__tile">
        <div className="post__karma">
          <div className="post__vote" onClick={() => castVote(_id, 1)}>&#x25B2;</div>
          <div>{karma}</div>
          <div className="post__vote" onClick={() => castVote(_id, -1)}>&#x25BC;</div>
        </div>
        <div className="post__image" style={postImageStyle} />
        <div className="post__content">
          <h3>{title}</h3>
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
          .post__body {
            
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
          .post__actions {
            border-bottom: 5px solid #696775;
          }
        `}
      </style>
    </div>
  );
};

export default Post;
