import ParentPost from '../components/ParentPost'
import CommentForm from '../components/CommentForm'
import axios from 'axios'

class PostPage extends React.Component {
  constructor(props) {
    super(props)

  }

  getInitialProps = async function () {

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

  render() {
    return (
      <div>
        <h1>{this.props.url.asPath}</h1>
        <ParentPost />
      </div>
    )
  }
}

export default PostPage;