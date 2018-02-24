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
    this.props.postComment(this.state.commentText)
  }

  postComment = (text) => {
    axios.get('/api')
      .then(res => {
        console.log('res', res.data)
        res.data.forEach(data => {
          if (data.subreddit.title === )
            console.log('data', data.subreddit._id)
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