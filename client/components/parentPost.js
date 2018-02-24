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
      postBodyText: '',
      comments: [],
      commentBody: '',
    }
  }

  componentDidMount() {
    axios.get('/api')
      .then(res => {
        console.log(res.data)
        res.data.forEach(post => {
          this.setState({
            title: post.title,
            postBodyText: post.body,
            postId: post._id
          })
          if (post.comments.length === 0) {
            this.setState({ comments: [] })
          } else {
            post.comments.forEach(comment => {
              console.log('commentBody', this.state.commentBody)
              this.setState({
                comments: post.comments,
                commentBody: comment.body
              }, () => { console.log(this.state.commentBody) })
            })
          }
        })
      })
      .then(res => {
        axios.get(`/api/post/:${this.state.postId}`)
      })
  }

  render() {
    return (
      <div>
        <div>
          Title of post: <br />
          {this.state.title} <br /><br />
          Body: <ReactMarkdown source={this.state.postBodyText} />
        </div>

        <CommentForm title={this.state.title} subredditId={this.state.subredditId} />


        {/* {this.state.commentBody} */}
      </div>

    )
  }
}


export default ParentPost;