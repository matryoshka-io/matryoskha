class ReplyCommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replyBoxText: '',
    }
  }

  onCommentBoxChangeHandler = (e) => {
    this.setState({ replyBoxText: e.target.value }, () => {
      console.log('commentbox', this.state.replyBoxText)
    })
  }

  // postCommentWithText = () => {
  //   this.props.postComment(this.state.commentText)
  // }

  render() {
    return (
      <div>
        <textarea value={this.state.replyBoxText} onChange={this.onCommentBoxChangeHandler} />
        <button onClick={this.postCommentWithText} > reply </button>
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

export default ReplyCommentBox