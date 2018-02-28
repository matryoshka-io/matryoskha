import axios from 'axios';
import homepage from '../pages/homepage'
import auth from '../utils/auth';
import sessions from '../utils/sessions';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      subredditName: '',
      postId: '',
    };
  }

  onCommentBoxChangeHandler = (e) => {
    this.setState({ commentText: e.target.value })
  }

  postCommentWithText = () => {
    this.postComment(this.state.commentText)
  }

  postComment = (commentText) => {
    const token = sessions.getToken('jwt');
    console.log('token', token)
    axios.get('/api', auth.makeTokenHeader(token))
      .then(res => {
        console.log('ressss data', res)
        res.data.forEach(data => {
          if (this.props.postTitle === data.title) {
            return this.setState({ postId: data._id })
          }
        })
        return this.state.postId
      })
      .then((res) => {
        console.log('res in then', res)
        return axios.post(`/api/post/${this.state.postId}`, { body: commentText }, auth.makeTokenHeader(token))
      })
      .then((res) => {
        console.log('res before success', res)
        console.log('SUCCESSFUL COMMENT POST')
      })
  }

  render() {
    return (
      <div>
        <textarea value={this.state.commentText} onChange={this.onCommentBoxChangeHandler} />
        <button onClick={this.postCommentWithText} > add comment</button>
        <style jsx>{`
          textarea {
            width: 400px;
            height: 100px;
            display: block;
            margin-bottom: 10px;
          }
          button {
            padding: 3px 4px;
          }
          @media (max-width: 750px) {
            textarea {
              width: 100%;
            }
          }
        `}
        </style>
      </div>
    )
  }
}
export default CommentForm;