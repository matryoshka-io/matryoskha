// const CommentListEntry = (props) => {
//   return (
//     <div>
//       Comments:
//       {props.comment.body}
//     </div>
//   )
// }
import CommentList from './CommentList';

class CommentListEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('entry props', this.props)
    return (
      < div >
        {this.props.comment.body}
        <CommentList comments={this.props.comment.comments} />
      </div >
    )
  }
}

export default CommentListEntry