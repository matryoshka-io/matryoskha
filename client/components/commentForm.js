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
          if (data.subreddit._id === this.props.subredditId) {
            this.setState({ subredditId: data.subreddit._id })
          }
          if (this.props.title === data.title) {
            this.setState({ postId: data._id })
          }
          console.log(this.state.subredditId)
          console.log(this.state.postId)
        })
      })
      .then(res => {
        return axios.post(`/sub/${this.state.subredditId}/post/${this.state.postId}`, { title: '', type: 'Comment', body: text })
        //end point not created? 
      })
      .then(res => {
        console.log('SUCCESSFUL COMMENT POST')
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