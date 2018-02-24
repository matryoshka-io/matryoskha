// export default () => (
//   <div>
//     <textarea />
//     <button>add comment</button>
//     <style jsx>{`
//         textarea {
//           width: 400px;
//           height: 100px;
//           display: block;
//           margin-bottom: 10px;
//         }
//         button {
//           padding: 3px 4px;
//         }
//         @media (max-width: 750px) {
//           textarea {
//             width: 100%;
//           }
//         }
//       `}</style>
//   </div>
// )
import axios from 'axios'

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      subredditId: '',
      postId: ''
    };
  }

  onCommentBoxChangeHandler = (e) => {
    this.setState({ commentText: e.target.value }, () => {
      console.log('hello', this.state.commentText)
    })
  }

  postCommentWithText = () => {
    this.postComment(this.state.commentText)
  }

  postComment = (text) => {
    axios.get('/api')
      .then(res => {
        res.data.forEach(data => {
          console.log('data', data)
          console.log('passed down data', this.props.subredditId)
          console.log('right subreddit id?', data.subreddit._id)
          if (data.subreddit._id === this.props.subredditId) {
            this.setState({ subredditId: data.subreddit._id })
          }
          if (this.props.title === data.title) {
            this.setState({ postId: data._id })
          }
        })
      })
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
        `}</style>
      </div>
    )
  }
}
export default CommentForm;