import Link from 'next/link';
import SubRedditBar from './SubredditBar';
import Rating from './Rating';
import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
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
      comments: []
    }

  }

  componentDidMount() {
    // axios.get('/api')
    //   .then(res => {
    //     console.log('RESSS', res)
    //   })
    axios.get('/api/post/5a8e0e2b7f911450d4600d99')
      .then(res => {
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
        Title of post: <br />
        {this.state.postTitle} < br /> <br />
        Body: <ReactMarkdown source={this.state.postBodyText} />

        <CommentForm title={this.state.title} subredditId={this.state.subredditId} />
        All comments:
        {this.state.comments.body}
        <CommentList comments={this.state.comments} />
      </div>


    );
  }
}

export default ParentPost;
