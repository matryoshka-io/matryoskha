
const Post = (props) => (
  <div>
    <h1>{props.url.asPath}</h1>

  </div>
);

Post.getInitialProps = async function () {

  return {
    navigation: {},       //  every page need this?
    user: {
      session: {},        //  state of the user session
      profile: {},        //  basic data for the user panel
      subscriptions: [],  //  or isSubscribed for the parent subreddit
    },
    post: {},             //  main post content
    comments: {}          //  initial comments load
  };
};

export default Post;