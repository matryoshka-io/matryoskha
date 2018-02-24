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

  postComment = (commentText) => {
    axios.get('/api')
      .then(res => {
        res.data.forEach(data => {
          console.log('data', data)
          data.comments.push(this.state.commentText)
        })
      })
      .then(res => {
        return axios.post(`/sub/:5a8e0e217f911450d4600d98/post/:5a8e0e2b7f911450d4600d99`, { type: 'Comment', body: commentText }, () => {
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