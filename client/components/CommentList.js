import ReactMarkdown from 'react-markdown';

import CommentListEntry from './CommentListEntry';


const CommentList = (props) => {
  return (
    <div>
      <div className="list">
        {(props.comments && props.comments.map) &&
          props.comments.map((comment, index) => {
            return (
              <CommentListEntry
                key={comment._id}
                index={index}
                comment={comment} x
                comments={props.comments}
                allComments={props.allComments}
                newCommentBody={props.newCommentBody}
                postId={props.postId}
                updateCommentList={props.updateCommentList}
              />
            )
          })}
      </div>

      <style>{`
          .list {
            // border-style: solid;
            border-width: 1px 1px 0px 1px;
            border-color: gray;
          }
          `}
      </style>
    </div >
  )
}


export default CommentList;