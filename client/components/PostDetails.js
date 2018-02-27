import Link from 'next/link'
import SubredditBar from './SubredditBar';

export default props => (
  <div>
    <div id="titleDiv">
      <Link href={props.subreddit}><a>{props.subreddit.title}</a></Link>
    </div>
    <span id="dateDiv"> submited: {props.subreddit.date.slice(11, 19)}</span>
    <span id="authorSpan">by: <a href="#">{props.author.username}</a></span>
    <span>to: <a href="#">{props.subreddit.title}</a></span>
    {/* <div>desc: {props.subreddit.description}</div> */}
    <div className="someBar">
      <SubredditBar className="subbredditbar" />
    </div>
    <style>
      {`
        #dateDiv, #authorSpan {
          margin-right: 10px
        }

        .someBar  {
            margin: 0px,
            padding 0px
        }
      `}
    </style>
  </div>
);
