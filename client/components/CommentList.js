import React from 'react';
import CommentListEntry from './CommentListEntry';


class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ comments: newProps }, () => {
  //     console.log('huh?', this.state.comments.comments);
  //     console.log('comments???', this.state.comments)
  //   })
  // }

  render() {
    console.log('this.props.comments', this.props.comments)
    return (
      <div >
        {this.props.comments.map((comment, index) => {
          return <CommentListEntry key={comment._id} comment={comment.comments} />
        })}
      </div >
    )
  }
}

// const CommentList = (props) => {
//   let nestedComments = (props.comments || []).map(comment => {
//     return <CommentList comment={comment} />
//   })
//   return (
//     <div key={this.props.comment._id}>
//       <span>{this.props.comment.body}</span>
//     </div>
//   )
// }

export default CommentList;
