import ParentPost from '../components/parentPost'
import CommentForm from '../components/commentForm'

class PostPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: ''
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
        <CommentForm commentText={this.state.commentText} commentOnChangeHandler={this.commentOnChangeHandler} />
      </div>
    )
  }
}

export default PostPage;