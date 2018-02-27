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
    return (
      // console.log('hullo', this.props.comment.comments)
      < div >
        < CommentList commentsArr={this.props.comment.comments} />
      </div >
    )
  }
}

export default CommentListEntry