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
        <MuiThemeProvider>
          <div className="list">
            {this.props.comments.map((comment, index) => {
              return (
                <CommentListEntry key={comment._id} index={index} comment={comment} newCommentBody={this.props.newCommentBody}
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
        </MuiThemeProvider>
      </div >
    )
  }
}

export default CommentList;
