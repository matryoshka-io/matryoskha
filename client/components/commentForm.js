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
    super(props)
    this.state = {
      commentText: ''
    }
  }

  commentOnChangeHandler(e) {
    this.setState({ commentText: e.target.value }, () => {
      console.log('hello', this.state.commentText)
    })
  }

  render() {
    return (
      <div>
        <textarea onChange={this.commentOnChangeHandler} />
        <button>add comment</button>
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