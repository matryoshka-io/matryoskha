import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Postdetail from '../pages/postDetail';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import auth from '../utils/auth';
import sessions from '../utils/sessions';
import Link from 'next/link';
import SubRedditBar from './SubredditBar';
import Rating from './Rating';

class ParentPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditId: '',
      postId: '',
      commentBody: '',
      postTitle: '',
      postBodyText: '',
      comments: [],
    }
  }

  componentDidMount = () => {
    axios.get('/api/post/5a8e0e2b7f911450d4600d99')
      .then(res => {
        console.log('res.data', res.data)
        this.setState({
          postTitle: res.data.title,
          postBodyText: res.data.body,
          postId: res.data._id,
          comments: res.data.comments,
        })
      })
  }

  postComment = (commentText) => {
    const token = sessions.getToken('jwt');
    axios.get('/api', auth.makeTokenHeader(token))
      .then(res => {
        res.data.forEach(data => {
          if (this.state.postTitle === data.title) {
            console.log('data', data)
            return this.setState({ postId: data._id })
          }
        })
        return this.state.postId
      })
      .then((res) => {
        return axios.post(`/api/post/${this.state.postId}`, { body: commentText }, auth.makeTokenHeader(token))
      })
      .then((res) => {
        console.log('SUCCESSFUL COMMENT POST')
        return res;
      })
      .then(res => {
        res.data.comments = [];
        let newCommentArr = this.state.comments.push(res.data)
        this.setState({ commentBody: newCommentArr })
      })
  }

  updateCommentList = (comments) => {
    this.setState({ comments });
  }

  render() {
    console.log('props in parnetPost', this.state)
    return (
      <div>
        <div className="postTitle">
          {this.state.postTitle}
        </div>
        <MuiThemeProvider>
          <div>
            <Paper style={this.style} zDepth={2} className="postBody">
              <ReactMarkdown source={this.state.postBodyText} />
            </Paper> <br />
          </div>
        </MuiThemeProvider>


        Add a new comment
        <CommentForm title={this.state.title} subredditId={this.state.subredditId} postComment={this.postComment} />

        <CommentList
          comments={this.state.comments}
          allComments={this.state.comments}
          newCommentBody={this.state.commentBody}
          postId={this.state.postId}
          updateCommentList={this.updateCommentList}
        />

        <style>{`
          .postBody {
            padding: 4px 0 20px 0;
          }
        `}</style>

      </div>


    );
  }
}

export default ParentPost;