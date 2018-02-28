import CommentList from './CommentList';
import ReactMarkdown from 'react-markdown';

class CommentListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReplyBoxHidden: true
    }
  }

  onReplyClickHandler() {
    //show commentForm

  }

  onDeleteClickHandler() {
    //find commentId
    //if the comment id in response matches the comment id of the post where 'delete was clicked',
    //take that comment id
    //and replace it in the delete url
    axios.get('/api')
      .then(res => {
        res.data.forEach((comment) => {

        })
      })
    axios.delete(`comment/${commentId}`)
  }

  onEditClickHandler() {

  }



  render() {
    console.log('entry props', this.props)
    return (
      <div>
        < div className="commentEntry">
          <ReactMarkdown source={this.props.comment.body} />
          <div id="replyComment"></div>
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
      </div>
    )
  }
}

export default CommentListEntry