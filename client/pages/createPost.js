import PostForm from '../components/PostForm';
import ParentPost from '../components/ParentPost';
import Page from '../components/Page'

const Post = props => (
  <Page>
    <h1>{props.url.asPath}</h1>
    <PostForm />
  </Page>
);

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
