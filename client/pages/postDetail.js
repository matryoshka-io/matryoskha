import ParentPost from '../components/parentPost'
import CommentForm from '../components/commentForm'

const PostPage = (props) => (
  <div>
    <h1>{props.url.asPath}</h1>
    <ParentPost />

    Post a comment:
    <CommentForm />
  </div>
)

PostPage.getInitialProps = async function () {

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

export default PostPage;