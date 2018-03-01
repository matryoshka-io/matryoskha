import Link from 'next/link';
import PostDetails from './PostDetails';
import Rating from './Rating';

export default ({ _id, author, subreddit, title }) => (
  <div>
    <div className="subbredditContent">
      <div className="rankingDiv">1</div>
      <div id="ratingDiv"><Rating /></div>
      <div id="imageDiv"><img src="http://lorempixel.com/400/200" style={{"width" : "70px","height": "70px"}}></img></div>
      <div><PostDetails subreddit={subreddit} title={title} author={author}/></div>
      <style jsx>{`
        #titleDiv, #dateDiv, #ratingDiv, #imageDiv {
          padding-right: 10px
        }
        .rankingDiv {
          padding-right: 15px
        }
        div {
          display: inline-block
        }
        .subbredditContent {
        }
        .subbredditbar {
          float: left
        }
        #imageDiv {
        width: 70px,
        height: 70px
        }
      `}
      </style>
    </div>
  </div>
);
