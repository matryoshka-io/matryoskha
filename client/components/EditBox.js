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
        console.log('res', res.data)
        res.data.comments.forEach((comment, index) => {
          console.log('comment', comment)
          console.log('editId', editId)
          if (comment._id === editId) {
            console.log('after if')
            this.setState({ commentId: comment._id }, () => {
              //getting 401 because i'm trying to edit the first comment
              console.log('commentid', this.state.commentId)
            })
          }
        })
      })
      .then(res => {
        return axios.put(`api/comment/${this.state.commentId}`, { body: editBoxText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        return axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })

      .then(res => {
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