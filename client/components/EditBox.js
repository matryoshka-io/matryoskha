import axios from 'axios';
import auth from '../utils/auth';
import sessions from '../utils/sessions';

class EditBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBoxText: '',
    };
    this.onEditBoxChangeHandler = this.onEditBoxChangeHandler.bind(this);
    this.postEditWithText = this.postEditWithText.bind(this);
    this.editComment = this.editComment.bind(this);
  }

  onEditBoxChangeHandler(e) {
    this.setState({
      editBoxText: e.target.value,
    })
  }

  postEditWithText() {
    this.setState({ editIndex: this.props.index },
      this.editComment(this.props.commentId, this.state.editBoxText) //should be editID not editIndex
    )
  }

  editComment(editId, editBoxText) {
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
        return axios.put(`/api/comment/${this.props.commentId}`, { body: editBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        return axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })

      .then(res => {
        this.props.updateCommentList(res.data.comments)
      })
      .then(res => {
        this.props.onEditClickHandler()
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