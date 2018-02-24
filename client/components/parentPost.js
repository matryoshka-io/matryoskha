import Link from 'next/link'
import SubRedditBar from './subbredditBar'
import Rating from './rating'
import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Postdetail from './postDetails'
import CommentForm from './commentForm'


class ParentPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subredditId: '',
      postId: '',
      title: '',
      newBodyText: '',
      comments: []
    }
  }

  componentDidMount() {
    axios.get('/api')
      .then(res => {
        return res.data.forEach(post => {
          console.log('comment collection', post.comments)
          console.log('type', Array.isArray(post.comments))
          let subredditID = post.subreddit._id;
          let bodyTextForEachPost = post.body;
          this.setState({
            subredditId: subredditID,
            title: post.title,
            newBodyText: bodyTextForEachPost,
            postId: post._id,
            comments: post.comments,
          }, () => console.log('???', this.state.comments))
        })
          .then(res => {
            axios.get(`/api/sub/${this.state.subredditId}/post/${this.state.postId}`)
          })
      })
      .then(res => {
        console.log('SUCCESSFUL MOUNT')
      })
    // axios.get('post/5a8e0e2b7f911450d4600d99')
  }

  // componentDidMount() {
  //   axios.get('/api')
  //     .then(res => {
  //       res.data.forEach(data => {
  //         if (res.data.title === /*subreddit title*/) {

  //         }
  //       })
  //     })
  //   // axios.get(`/post/${postID}`)
  // }


  render() {
    return (
      <div>
        <div>
          Title of post: <br />
          {this.state.title} <br /><br />
          Body: <ReactMarkdown source={this.state.newBodyText} />
        </div>

        <CommentForm title={this.state.title} subredditId={this.state.subredditId} />

        {this.state.comments.toString()}
      </div>

    )
  }
}


export default ParentPost;