import PostForm from '../components/PostForm';
import ParentPost from '../components/ParentPost';

const Post = props => (
  <div>
    <h1>{props.url.asPath}</h1>
    <PostForm />
  </div>
)

Post.getInitialProps = async function GetInitialPostData() {

  return {
    navigation: {},
    user: {
      session: {},
      profile: {},
      subscriptions: [],
    },
    post: {},
    comments: {},
  };
};

export default Post;
