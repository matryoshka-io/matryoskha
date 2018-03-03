import React from 'react';
import CommentListEntry from './CommentListEntry';
import ReactMarkdown from 'react-markdown';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ comments: newProps })
  }

  render() {
    return (
      <div>
        <div className="list">
          {(this.props.comments && this.props.comments.map) &&
            this.props.comments.map((comment, index) => {
              return (
                <CommentListEntry
                  key={comment._id}
                  index={index}
                  comment={comment}
                  comments={this.props.comments}
                  allComments={this.props.allComments}
                  newCommentBody={this.props.newCommentBody}
                  postId={this.props.postId}
                  updateCommentList={this.props.updateCommentList}
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
}

export default CommentList;