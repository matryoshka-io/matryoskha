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
      <div className="list">
        {this.props.comments.map((comment, index) => {
          return <CommentListEntry key={comment._id} comment={comment} />
        })}
        <style>{`
          .list {
            // background-color: #828282;

            border-style: solid;
            border-width: 1px 1px 0px 1px;
            border-color: gray;
          }
          `}
        </style>
      </div >
    )
  }
}

export default CommentList;
