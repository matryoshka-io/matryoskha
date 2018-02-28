import React from 'react';
import CommentListEntry from './CommentListEntry';


class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ comments: newProps })
  }

  render() {
    return (
      <div >
        {this.props.comments.map((comment, index) => {
          return <CommentListEntry key={comment._id} comment={comment} />
        })}
      </div >
    )
  }
}

export default CommentList;
