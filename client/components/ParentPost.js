import Link from 'next/link';
import SubRedditBar from './SubredditBar';
import Rating from './Rating';
import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Postdetail from '../pages/postDetail';
import CommentForm from './CommentForm';
import CommentList from './CommentList';


class ParentPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditId: '',
      postId: '',
      postTitle: '',
      postBodyText: '',
      commentBody: '',
      comments: [],
    }

  }

  componentDidMount() {
    // axios.get('/api')
    //   .then(res => {
    //     console.log('RESSS', res)
    //   })
    axios.get('/api/post/5a8e0e2b7f911450d4600d99')
      .then(res => {
        // console.log('res from parentpost', res)
        this.setState({
          postTitle: res.data.title,
          postBodyText: res.data.body,
          postId: res.data._id,
          comments: res.data.comments,
        })
      })
  }

  render() {
    return (
      <div>
        <div className="postTitle">
          {this.state.postTitle}
        </div>
        <MuiThemeProvider>
          <div>
            <Paper style={this.style} zDepth={2} className="postBody">
              <ReactMarkdown source={this.state.postBodyText} />
            </Paper> <br />
          </div>
        </MuiThemeProvider>
        Add a new comment
        <CommentForm title={this.state.title} subredditId={this.state.subredditId} postTitle={this.state.postTitle} />
        {this.state.comments.body}
        <CommentList comments={this.state.comments} />
        <style>{`
          .postBody {
            padding: 4px 0 20px 0;
          }
        `}</style>
      </div>


    );
  }
}

export default ParentPost;
