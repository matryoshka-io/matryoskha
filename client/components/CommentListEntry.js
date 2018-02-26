const CommentListEntry = (props) => {
  return (
    <div>
      Comments:
      {props.comment.body}
    </div>
  )
}

export default CommentListEntry