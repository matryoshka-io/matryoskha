<<<<<<< HEAD:client/pages/post.js
=======
import PostForm from '../components/PostForm'
import ParentPost from '../components/parentPost'
>>>>>>> 1139e1e5c4267a2d7da8f8369b8befb44cea67fd:client/pages/createPost.js

const Post = (props) => (
  <div>
    <h1>{props.url.asPath}</h1>
<<<<<<< HEAD:client/pages/post.js

=======
    <PostForm />
>>>>>>> 1139e1e5c4267a2d7da8f8369b8befb44cea67fd:client/pages/createPost.js
  </div>
)

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