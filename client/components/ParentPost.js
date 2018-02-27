<<<<<<< HEAD:client/components/ParentPost.js
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import SubRedditBar from './SubredditBar';
import Rating from './Rating';
import Postdetail from './PostDetails';
import CommentForm from './CommentForm';
=======
import Link from 'next/link';
import SubRedditBar from './subbredditBar';
import Rating from './rating';
import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Postdetail from './postDetails';
import CommentForm from './commentForm';
>>>>>>> testing the rendering with hard coded postId:client/components/parentPost.js


class ParentPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditId: '',
      postId: '',
      postTitle: '',
      postBodyText: '',
      commentBody: '',
    };
  }

  componentDidMount() {
<<<<<<< HEAD:client/components/ParentPost.js
    axios.get('/api')
      .then((res) => {
        console.log(res.data);
        res.data.forEach((post) => {
          this.setState({
            title: post.title,
            postBodyText: post.body,
            postId: post._id
          })
          if (post.comments.length === 0) {
            this.setState({ comments: [] })
          } else {
            post.comments.forEach((comment) => {
              console.log('commentBody', this.state.commentBody)
              this.setState({
                comments: post.comments,
                commentBody: comment.body,
              }, () => { console.log(this.state.commentBody); });
            });
          }
        });
      })
      .then((res) => {
        axios.get(`/api/post/:${this.state.postId}`);
      });
=======
    // axios.get('/api')
    //   .then(res => {
    //     console.log('RESSS', res)
    //   })
    axios.get('/api/post/5a8e0e2b7f911450d4600d99')
      .then(res => {
        console.log('res', res)
        this.setState({
          postTitle: res.data.title,
          postBodyText: res.data.body,
          postId: res.data._id
        })
      })
    // .then(res => {
    //   console.log('res', res)
    //   res.data.forEach(post => {
    //     this.setState({
    //       postTitle: post.title,
    //       postBodyText: post.body,
    //       postId: post._id
    //     })
    //   })
    // })
    // .then(res => {
    //   console.log(res.data)
    //   res.data.forEach(post => {
    //     this.setState({
    //       title: post.title,
    //       postBodyText: post.body,
    //       postId: post._id
    //     })
    //     if (post.comments.length === 0) {
    //       this.setState({ comments: [] })
    //     } else {
    //       post.comments.forEach(comment => {
    //         console.log('commentBody', this.state.commentBody)
    //         this.setState({
    //           comments: post.comments,
    //           commentBody: comment.body
    //         }, () => { console.log(this.state.commentBody) })
    //       })
    //     }
    //   })
    // })
    // .then(res => {
    //   axios.get(`/api/post/:${this.state.postId}`)
    // })
    // .then(res => {
    //   console.log('RESPONSEEEEE', res)
    // })
>>>>>>> testing the rendering with hard coded postId:client/components/parentPost.js
  }

  render() {
    return (
      <div>
        <div>
          Title of post: <br />
          {this.state.postTitle} <br /><br />
          Body: <ReactMarkdown source={this.state.postBodyText} />
        </div>

        <CommentForm title={this.state.title} subredditId={this.state.subredditId} />


        {/* {this.state.commentBody} */}
      </div>

    );
  }
}

export default ParentPost;
