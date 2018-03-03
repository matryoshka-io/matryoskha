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
    console.log('propsindex', this.props.index)
    this.setState({ editIndex: this.props.index },
      this.editComment(this.state.editIndex, this.state.editBoxText)
    )
  }

  editComment = (editIndex, editedBody) => {
    const token = sessions.getToken('jwt')
    axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      .then(res => {
        console.log('res.data', res.data)
        res.data.comments.forEach((comment, index) => {
          console.log('after foreach')
          console.log('index', index)
          console.log('editindex', editIndex)
          if (index === editIndex) {
            console.log('after if')
            this.setState({ commentId: comment._id }, () => {
              console.log('commentid', this.state.commentId)
            })
          }
        })
        return this.state.commentId;
      })
      .then(res => {
        return axios.put(`api/comment/${this.state.commentId}`, { body: 'i have been edited' })
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