import CommentList from './CommentList';
import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import CommentForm from './CommentForm';
import ReplyCommentBox from './ReplyCommentBox';
import EditBox from './EditBox'
import auth from '../utils/auth';
import sessions from '../utils/sessions';

class CommentListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReplyBoxHidden: true,
      isEditBoxHidden: true,
      commenetBody: '',
      commentId: '',
      deleteIndex: '',

    }

    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
  }

  onReplyClickHandler = () => {
    this.setState({ isReplyBoxHidden: !this.state.isReplyBoxHidden })
  }

  replyAndSetNewCommentId = (commentId) => {
    this.setState({ commentId })
  }

  onDeleteClickHandler = () => {
    this.setState({ deleteIndex: this.props.index },
      this.onDeleteClickWithIndex(this.props.comment._id)
    )
  }

  onDeleteClickWithIndex = (deleteId) => {
    const token = sessions.getToken('jwt')
    axios.get(`api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      .then(res => {
        res.data.comments.forEach(comment => {
          this.setState({ commentId: deleteId })
        })
      })
      .then(res => {
        return axios.delete(`api/comment/${this.state.commentId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        return axios.get(`api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        this.props.updateCommentList(res.data.comments)
        console.log('SUCCESSFUL DELETE')
      })
  }

  onEditClickHandler = () => {
    this.setState({
      isEditBoxHidden: !this.state.isEditBoxHidden
    })
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Paper style={this.style} zDepth={2} className="commentEntry">

            <ReactMarkdown source={this.props.comment.body} />

            <div id="date">
              {this.props.comment.date}
            </div>

          </Paper>
        </MuiThemeProvider>
        <div className="bar">
          <div id="replyComment">
            <a onClick={this.onReplyClickHandler}>reply</a>
          </div>
          <div id="deleteComment">
            <a onClick={this.onDeleteClickHandler}>delete</a>

          </div>
          <div id="editComment">
            <a onClick={this.onEditClickHandler}>edit</a>
          </div>
        </div>
        {this.state.isReplyBoxHidden ? null : <ReplyCommentBox
          allComments={this.props.allComments}
          postId={this.props.postId}
          index={this.props.index}
          replyAndSetNewCommentId={this.replyAndSetNewCommentId}
          commentId={this.props.comment._id}
          nestedComments={this.props.comment.comments}
          updateCommentList={this.props.updateCommentList}

        />}

        {this.state.isEditBoxHidden ? null : <EditBox
          commentBody={this.state.commentBody}
          postId={this.props.postId}
          index={this.props.index}
          commentId={this.props.comment._id}
          updateCommentList={this.props.updateCommentList}
          replyAndSetNewCommentId={this.replyAndSetNewCommentId}
        />}


        {this.props.comment.comments && <CommentList
          allComments={this.props.allComments}
          comments={this.props.comment.comments}
          postId={this.props.postId}
          updateCommentList={this.props.updateCommentList}
        />}


        <style> {`
          .bar {
            display: flex;
            justify-content: space-between;
            max-width: 125px;
            margin: 5px 0px 12px 15px;
          }
          #date {
            font-size: 10px;
          }
          .commentEntry {
            width: 98%;
            margin: auto;
            padding: 10px 5px 5px 10px;
          }
          #replyComment a, #deleteComment a, #editComment a {
            display: flex;
            align-items: center;
            font-size: 11px;
            text-transform: uppercase;
            padding: 10px 0 0;
          }
          a:hover {
            color: #A9A9A9;
          }
        `}
        </style>
      </div >


    )
  }
}

export default CommentListEntry