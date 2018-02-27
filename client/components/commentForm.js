import axios from 'axios';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      subredditName: '',
      postId: '',
    };
  }

  onCommentBoxChangeHandler(e) {
    this.setState({ commentText: e.target.value }, () => {
      console.log('hello', this.state.commentText);
    });
  }

  postCommentWithText() {
    this.postComment(this.state.commentText)
  }

  postComment(commentText) {
    axios.get('/api')
      .then((res) => {
        res.data.forEach((data) => {
          this.setState({
            postId: data._id,
          });
        });
      })
      .then(res => axios.post(`/api/post/${this.state.postId}`, { type: 'Comment', body: commentText }))
      .then(res => console.log('SUCCESSFUL COMMENT POST'))
  }

  render() {
    return (
      <div>
        <textarea value={this.state.commentText} onChange={this.onCommentBoxChangeHandler} />
        <button onClick={this.postCommentWithText} > add comment</button>
        <style jsx>
          {`
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
