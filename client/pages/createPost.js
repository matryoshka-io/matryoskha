import PostForm from '../components/PostForm';
import ParentPost from '../components/ParentPost';
import Page from '../components/Page'

const Post = props => (
  <div>
    <Page>
      <PostForm />
    </Page>

  </div>
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
