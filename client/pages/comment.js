import React from 'react';

const Comment = ({ comment, depth }) => {
  let tabIn = '';
  for (let i = 0; i < depth; i += 1) {
    tabIn += '-- ';
  }
  if (comment.comments.length === 0) {
    console.log(tabIn);
    return (
      <div>{tabIn}{comment.body}{` by /u/${comment.author.username}`}</div>
    );
  } else {
    console.log(tabIn);
    return (
      <div>
        {tabIn}{comment.body}{` by /u/${comment.author.username}`}<br />
        {comment.comments.map((comment, index) => {
          return <Comment key={index} comment={comment} depth={depth + 1} />;
        })}
      </div>
    );
  }
};

export default Comment;
