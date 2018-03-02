import React from 'react';

const Comment = ({ comment }) => {
  if (!comment.comments.length) {
    return (
      <div>{comment.body}</div>
    );
  } else {
    return (
      <div>
        {comment.body}
        {comment.comments.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </div>
    );
  }
};

export default Comment;
