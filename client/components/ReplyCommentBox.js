import axios from 'axios';
import auth from '../utils/auth';
import sessions from '../utils/sessions';

class ReplyCommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replyBoxText: '',
      replyIndex: '',
    }
  }

  onReplyBoxChangeHandler = (e) => {
    this.setState({
      replyBoxText: e.target.value
    })
  }

  postReplyWithText = () => {
    console.log('this.props.commentid', this.props.commentId)
    this.setState({ replyIndex: this.props.index },
      this.replyToComment(this.state.replyBoxText, this.props.commentId)
    )
  }

  replyToComment = (replyBoxText, commentId) => {
    console.log('click')
    const token = sessions.getToken('jwt')
    axios.get(`api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      .then(res => {
        res.data.comments.forEach((comment, index) => {
          console.log('comment', comment)
          if (comment._id === commentId) {
            this.props.replyAndSetNewCommentId(comment._id)
          }
        })
        return this.props.commentId
      })
      .then(res => {
        return axios.post(`api/comment/${this.props.commentId}`, { body: replyBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        const newComment = { ...res.data, comments: [] }
        return axios.get(`api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        this.props.updateCommentList(res.data.comments)
      })
      .then(res => {
        console.log('SUCCESSFUL REPLY')
      })
  }

  render() {
    return (
      <div>
        <textarea value={this.state.replyBoxText} onChange={this.onReplyBoxChangeHandler} />
        <button onClick={this.postReplyWithText} > reply </button>
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

export default ReplyCommentBox