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
    this.setState({ replyIndex: this.props.index },
      this.replyToComment(this.state.replyBoxText, this.props.commentId)
    )
  }

  replyToComment = (replyBoxText, parentId) => {
    console.log('click')
    const token = sessions.getToken('jwt')
    axios.get(`api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      .then(res => {
        res.data.comments.forEach((comment, index) => {
          console.log('comment', comment)
          if (comment._id === parentId) {
            this.props.replyAndSetNewCommentId(comment._id)
          }
        })
        return this.props.commentId
      })
      .then(res => {
        console.log('res', res)
        return axios.post(`api/comment/${this.props.commentId}`, { body: replyBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        const newComment = { ...res.data, comments: [] }
        return axios.get(`api/post/${this.props.postId}`, auth.makeTokenHeader(token))
        // console.log('this.props.comment', this.props.comment)

        // this.props.updateCommentList(this.props.allComments)
        // console.log('SUCCESSFUL REPLY')
      })
      .then(res => {
        console.log('res', res)
        this.props.updateCommentList(res.data.comments)
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