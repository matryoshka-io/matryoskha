import axios from 'axios';
import auth from '../utils/auth';
import sessions from '../utils/sessions';

class EditBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editIndex: '',
      editPrefilledBody: '',
      editBoxText: ''
    }
  }

  onEditBoxChangeHandler = (e) => {
    this.setState({
      editBoxText: e.target.value
    })
  }

  postEditWithText = () => {
    console.log('this.props.commentId', this.props.commentId)
    this.setState({ editIndex: this.props.index },
      this.editComment(this.props.commentId, this.state.editBoxText) //should be editID not editIndex
    )
  }

  editComment = (editId, editBoxText) => {
    const token = sessions.getToken('jwt')
    axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      .then(res => {
        res.data.comments.forEach((comment, index) => {
          if (comment._id === editId) {
            this.props.replyAndSetNewCommentId(comment._id)
          }
        })
      })
      .then(res => {
        return axios.put(`api/comment/${this.props.commentId}`, { body: editBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        return axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })

      .then(res => {
        console.log('res after', res)
        this.props.updateCommentList(res.data.comments)
        console.log('SUCCESSFUL EDIT')
      })
  }

  render() {
    return (
      <div>
        <textarea value={this.state.editBoxText} onChange={this.onEditBoxChangeHandler} />
        <button onClick={this.postEditWithText} > edit </button>
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

export default EditBox;