import Link from 'next/link';
import SubredditBar from './SubredditBar';

export default ({ subreddit, title, image, author, date }) => {
  const postImageStyle = {
    background: `url(${image}) top center no-repeat`,
    backgroundSize: 'cover',
    backgroundColor: '#333',
    width: '40px',
    height: '40px',
  };
  return (
    <div className="post__tile">
      <div className="post__image" style={postImageStyle} />
      <div className="post__content">
        <h3>{title}</h3>
        <div className="post__meta">
          <span id="dateDiv">{subreddit.date.slice(11, 19)}</span>
          <Link href={`/u/${author.username}`}><span id="authorSpan">{author.username}</span></Link>
          <Link href={`/r/${subreddit}`}><span>{`/r/${subreddit.title.toLowerCase()}`}</span></Link>
        </div>
        <SubredditBar />
      </div>
      <style>
        {`
          .post__tile {
            display: flex;
            flex-flow: row;
          }
          .post__image {
            flex: 1 auto;
            margin: 8px;
          }
          .post__content {
            flex: 3 auto;
            margin: 8px;
          }
        `}
      </style>
    </div>
  );
};
