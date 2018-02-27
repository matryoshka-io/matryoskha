import auth from '../utils/auth';
import data from '../utils/data';
import sessions from '../utils/sessions';

import 'isomorphic-fetch';

const Subreddit = (props) => (
  <div>
    <h1>{props.url.asPath}</h1>
    <h2>{props.message}</h2>
    <p>{props.posts[0].title}</p>
    <style jsx>
    {`
      h1 { font-size: 36px; color: #333;}
      h2 { margin-left: 16px; }
    `}
    </style>
  </div>
);

Subreddit.getInitialProps = async function (context) {
  // initial data requests happen in here
  // they are passed to props above automatically
  const session = await auth.initializeSession(context);
  // const posts = await data.getPosts(session);
  console.log(`http://localhost:3000/api/sub/${context.query.subreddit}`);
  const subreddit = await fetch(`http://localhost:3000/api/sub/${context.query.subreddit}`);
  const json = await subreddit.json();
  console.log(json);

  return {
    posts: json,
    message: "There are many dolls, but this one is ours",
  };
};

export default Subreddit;
