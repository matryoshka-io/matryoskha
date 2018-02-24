import ParentPost from '../components/parentPost'
import CommentForm from '../components/commentForm'
import axios from 'axios'

class PostPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subredditId: '',
      postId: ''
    }

  }

  componentDidMount() {
    //all comments related to thread post
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

        Post a comment:
        <CommentForm />
      </div>
    )
  }
}

export default PostPage;