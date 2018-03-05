import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import Link from 'next/link'

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import ReplyCommentBox from './ReplyCommentBox';
import EditBox from './EditBox'
import auth from '../utils/auth';
import sessions from '../utils/sessions';
import utils from '../utils';


const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


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
  }

  onReplyClickHandler = () => {
    const token = sessions.getToken('jwt')
    if (token) {
      this.setState({ isReplyBoxHidden: !this.state.isReplyBoxHidden })
    }
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
    axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      .then(res => {
        res.data.comments.forEach(comment => {
          this.setState({ commentId: deleteId })
        })
      })
      .then(res => {
        return axios.delete(`/api/comment/${this.state.commentId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        return axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        this.props.updateCommentList(res.data.comments)
        console.log('SUCCESSFUL DELETE')
      })
  }

  onEditClickHandler = () => {
    const token = sessions.getToken('jwt')
    if (token) {
      this.setState({
        isEditBoxHidden: !this.state.isEditBoxHidden
      })
    }
  }

  castVote(commentId, vote) {
    const token = sessions.getToken('jwt')
    return axios.post(`/api/vote/${commentId}`, { vote: vote }, auth.makeTokenHeader(token))
      .then(res => {
        console.log('SUCCESSFUL VOTE')
      })
      .then(res => {
        return axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        this.props.updateCommentList(res.data.comments)
      })
  }

  deleteVote(commentId, vote) {
    const token = sessions.getToken('jwt')
    return axios.delete(`/api/vote/${commentId}`, auth.makeTokenHeader(token))
      .then(res => {
        console.log('SUCCESSFUL VOTE')
      })
      .then(res => {
        return axios.get(`/api/post/${this.props.postId}`, auth.makeTokenHeader(token))
      })
      .then(res => {
        this.props.updateCommentList(res.data.comments)
      })
  }

  castUpVote = () => {
    this.castVote(this.props.comment._id, 1)
  }

  castDownVote = () => {
    this.deleteVote(this.props.comment._id, 1)
  }

  render() {
    return (
      <div className="entries">

        <MuiThemeProvider>
          <Paper style={this.style} zDepth={2} className="commentEntry">
            <div className="box">
              <div className="votes">
                <div id="upvote" onClick={this.castUpVote}>&#x25B2; </div>
                <div id="totalVotes">{this.props.comment.karma}</div>
                <div id="downvote" onClick={this.castDownVote}>&#x25BC;</div>
              </div>
              <div className="content">
                <div id="username"> <Link href={`/u/${this.props.comment.author.username}`}><a>{this.props.comment.author.username}</a></Link> </div>
                <div id="commentBody"><ReactMarkdown source={this.props.comment.body} /></div>
                <div id="date">{this.props.comment.date}</div>
              </div>
            </div>
          </Paper>
        </MuiThemeProvider>

        <div className="bar">
          <div id="replyComment"> <a onClick={this.onReplyClickHandler}>reply</a></div>
          <div id="deleteComment"><a onClick={this.onDeleteClickHandler}>delete</a></div>
          <div id="editComment"><a onClick={this.onEditClickHandler}>edit</a></div>
        </div>

        {
          this.state.isReplyBoxHidden ? null : <ReplyCommentBox
            allComments={this.props.allComments}
            postId={this.props.postId}
            index={this.props.index}
            replyAndSetNewCommentId={this.replyAndSetNewCommentId}
            commentId={this.props.comment._id}
            updateCommentList={this.props.updateCommentList}
            onReplyClickHandler={this.onReplyClickHandler}


          />
        }

        {
          this.state.isEditBoxHidden ? null : <EditBox
            commentBody={this.state.commentBody}
            postId={this.props.postId}
            index={this.props.index}
            commentId={this.props.comment._id}
            updateCommentList={this.props.updateCommentList}
            replyAndSetNewCommentId={this.replyAndSetNewCommentId}
            onEditClickHandler={this.onEditClickHandler}
          />
        }


        {
          this.props.comment.comments && <CommentList
            allComments={this.props.allComments}
            comments={this.props.comment.comments}
            postId={this.props.postId}
            updateCommentList={this.props.updateCommentList}
          />
        }


        <style> {`
          .bar {
            display: flex;
            justify-content: space-between;
            max-width: 125px;
            margin: 5px 0px 12px 15px;
          }
          #username {
            font-size: 12px;
          }
          #date {
            font-size: 10px;
          }
          #commentBody {
            font-size: 14px;
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
          .entries {
            padding-left: 20px
          }
          .votes {
            width: 30px;
            height: 80px;
            padding-top: 8px;
            margin-right: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
          .box {
            display: flex;
            align-items: center;
          }
          #upvote:hover, #downvote:hover {
            color: #ffcc00;
            cursor: pointer;
          }
        `}
        </style>
      </div >


    )
  }
}

export default CommentListEntry