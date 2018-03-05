import axios from 'axios';
import homepage from '../pages/frontpage';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
    this.onCommentBoxChangeHandler = this.onCommentBoxChangeHandler.bind(this);
    this.postCommentWithText = this.postCommentWithText.bind(this);
  }

  onCommentBoxChangeHandler(e) {
    this.setState({ commentText: e.target.value })
  }

  postCommentWithText() {
    this.props.postComment(this.state.commentText)
  }

  render() {
    return (
      <div>
        <textarea value={this.state.commentText} onChange={this.onCommentBoxChangeHandler} />
        <button onClick={this.postCommentWithText} > add comment</button>
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
export default CommentForm;