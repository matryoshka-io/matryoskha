import Link from 'next/link';
import moment from 'moment';

import PostDetails from './PostDetails';
import Rating from './Rating';
import SubredditBar from './SubredditBar';

const Post = ({ _id, type, author, subreddit, title, titleSlug, karma, date, thumbnail, url, voted, castVote }) => {
  let postImageStyle = {
    backgroundSize: 'cover',
  };

  if (type === 'Article' || type === 'Video') {
    postImageStyle.backgroundImage = `url(${thumbnail})`;
  }
  else if (type === 'Image'){
    postImageStyle.backgroundImage = `url(${url})`;
  }
  else {
    postImageStyle.backgroundColor = '#333';
  }

  const karmaClasses = ['post__vote'];
  const upvoteClasses = ['post__vote'];
  const downvoteClasses = ['post__vote'];

  if (voted && voted > 0) {
    karmaClasses.push('happy');
    upvoteClasses.push('happy');
  }
  if (voted && voted < 0) {
    karmaClasses.push('sad');
    downvoteClasses.push('sad');
  }

  return (
    <div className="post__tile">
      <div className="post__karma">
        <div className={upvoteClasses.join(' ')} onClick={() => castVote(voted, _id, 1)}>&#x25B2;</div>
        <div className={karmaClasses.join(' ')}>{karma}</div>
        <div className={downvoteClasses.join(' ')} onClick={() => castVote(voted, _id, -1)}>&#x25BC;</div>
      </div>
      <div className="post__image" style={postImageStyle} />
      <div className="post__content">
        <h3>{title}</h3>
        <div className="post__meta">
          <ul>
            <li>submitted {moment(date).fromNow()}</li>
            <li>by <Link href={`/u/${author.username}`}><a>{author.username}</a></Link></li>
            <li>to <Link href={`/r/${subreddit.titleSlug}`}><a>{`/r/${subreddit.titleSlug}`}</a></Link></li>
          </ul>
        </div>
        <div className="post__actions">
          <ul>
            <li>
              <Link href={`/r/${subreddit.titleSlug}/${_id}/${titleSlug}`}><a>Comments</a></Link>
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
            border-bottom: solid 5px #696775;
          }
        `}
      </style>
    </div>
  );
};

export default Post;