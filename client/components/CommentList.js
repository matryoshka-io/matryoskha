import CommentListEntry from './CommentListEntry'

class CommentList extends React.Component {
  constructor(props) {
    super(props)
    console.log('props', props)
  }

  componentWillReceiveProps = (newProps) => {
    console.log('new props', newProps)
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