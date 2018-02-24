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
      subredditName: '',
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

  postComment = (commentText) => {
    axios.get('/api')
      .then(res => {
        res.data.forEach(data => {
          console.log('data', data._id)
          console.log('comment textttttt', commentText)
          // data.comments.push(this.state.commentText)
          this.setState({
            // subredditId: data.subreddit._id,
            subredditName: data.subreddit.title,
            postId: data._id
          })
        })
      })
      .then(res => {
        return axios.post(`/sub/${this.state.subredditName}/post/:${this.state.postId}`, { type: 'Comment', body: commentText }, () => {
          console.log('am i working?')
        })
      })
      //not sure if this is working  
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