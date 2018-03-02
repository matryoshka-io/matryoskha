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
    }, () => {
      console.log('commentbox', this.state.replyBoxText)
    })
  }

  postReplyWithText = () => {
    this.setState({ replyIndex: this.props.index },
      this.replyToComment(this.state.replyBoxText)
    )
  }

  replyToComment = (replyBoxText) => {
    console.log('reply', replyBoxText)
    const token = sessions.getToken('jwt')
    console.log('token', token)
    axios.get(`api/post/${this.props.postId}`)
      .then(res => {
        res.data.comments.forEach((comment, index) => {
          if (index === this.state.replyIndex) {
            this.props.replyAndSetNewCommentId(comment._id)
          }
        })
        return this.props.commentId
      })
      .then(res => {
        return axios.post(`api/comment/${res}`, { body: replyBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        //create a new collection
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