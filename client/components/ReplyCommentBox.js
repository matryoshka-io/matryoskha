<<<<<<< HEAD
import axios from 'axios';
import auth from '../utils/auth';
import sessions from '../utils/sessions';

=======
>>>>>>> [front-end] created separate box for replies
class ReplyCommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replyBoxText: '',
<<<<<<< HEAD
      replyIndex: '',
    }
  }

  onReplyBoxChangeHandler = (e) => {
    this.setState({
      replyBoxText: e.target.value
<<<<<<< HEAD
=======
    }, () => {
      console.log('commentbox', this.state.replyBoxText)
>>>>>>> master
    })
  }

  postReplyWithText = () => {
<<<<<<< HEAD
    console.log('allCOmments', this.props.allComments)
    console.log('this.props.comments', this.props.comments)
    console.log('this.props.commentId', this.props.commentId)
    const parent =
      this.setState({ replyIndex: this.props.index },
        this.replyToComment(this.state.replyBoxText, this.props.commentId)
      )
  }

  replyToComment = (replyBoxText, parentId) => {
    const token = sessions.getToken('jwt')
    axios.get(`api/post/${this.props.postId}`)
      .then(res => {
        res.data.comments.forEach((comment, index) => {
          console.log('comment', comment)
          if (comment._id === parentId) {
=======
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
>>>>>>> master
            this.props.replyAndSetNewCommentId(comment._id)
          }
        })
        return this.props.commentId
      })
      .then(res => {
<<<<<<< HEAD
        console.log('res', res)
        return axios.post(`api/comment/${this.props.commentId}`, { body: replyBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        const newComment = { ...res.data, comments: [] }
        return axios.get(`api/post/${this.props.postId}`)
        // console.log('this.props.comment', this.props.comment)

        // this.props.updateCommentList(this.props.allComments)
        // console.log('SUCCESSFUL REPLY')
      })
      .then(res => {
        console.log('res', res)
        this.props.updateCommentList(res.data.comments)
=======
        return axios.post(`api/comment/${res}`, { body: replyBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        //create a new collection
        console.log('SUCCESSFUL REPLY')
>>>>>>> master
      })
  }
=======
    }
  }

  onCommentBoxChangeHandler = (e) => {
    this.setState({ replyBoxText: e.target.value }, () => {
      console.log('commentbox', this.state.replyBoxText)
    })
  }

  // postCommentWithText = () => {
  //   this.props.postComment(this.state.commentText)
  // }
>>>>>>> [front-end] created separate box for replies

  render() {
    return (
      <div>
<<<<<<< HEAD
        <textarea value={this.state.replyBoxText} onChange={this.onReplyBoxChangeHandler} />
        <button onClick={this.postReplyWithText} > reply </button>
=======
        <textarea value={this.state.replyBoxText} onChange={this.onCommentBoxChangeHandler} />
        <button onClick={this.postCommentWithText} > reply </button>
>>>>>>> [front-end] created separate box for replies
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