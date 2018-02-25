class CommentList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.comments.map(comment => {
          <CommentListEntry comment={comment} />
        })}
      </div>
    )
  }
}

export default CommentList;