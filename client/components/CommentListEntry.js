import CommentList from './CommentList';
import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class CommentListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReplyBoxHidden: true
    }
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
  }

  onReplyClickHandler() {
    //when clicked, this.setState isReplyBoxHidden to false

  }

  onDeleteClickHandler() {
    //find commentId
    //if the comment id in response matches the comment id of the post where 'delete was clicked',
    //take that comment id
    //and replace it in the delete url
    // axios.get('/api')
    //   .then(res => {
    //     res.data.forEach((comment) => {

    //     })
    //   })
    axios.delete(`comment/${commentId}`)
  }

  onEditClickHandler() {

  }



  render() {
    console.log('entry props', this.props)
    return (
      <div>
        <MuiThemeProvider>
          <Paper style={this.style} zDepth={2} className="commentEntry">
            <ReactMarkdown source={this.props.comment.body} />
          </Paper>

          <div id="replyComment">
            <a onClick={this.onReplyClickHandler}>reply</a>
          </div>
          <div id="deleteComment">
            <a onClick={this.onDeleteClickHandler}>delete</a>
          </div>
          <div id="editComment">
            <a onClick={this.onEditClickHandler}>edit</a>
          </div>
          <CommentList comments={this.props.comment.comments} />
          <style> {`
          .commentEntry {
            width: 98%;
            margin: auto;
          }
          #replyComment a, #deleteComment a, #editComment a {
            display: inline-block;
            font-size: 11px;
            text-transform: uppercase;
          }
          a:hover {
            color: #A9A9A9;
          }
        `}
          </style>
        </MuiThemeProvider >
      </div >
    )
  }
}

export default CommentListEntry