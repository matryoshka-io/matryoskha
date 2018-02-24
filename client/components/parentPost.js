import Link from 'next/link'
import SubRedditBar from './subbredditBar'
import Rating from './rating'
import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Postdetail from './postDetails'


class ParentPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subreddit: '',
      title: '',
      newBodyText: '',
    }
  }

  componentDidMount = () => {
    axios.get('/api')
      .then(res => {
        return res.data.forEach(post => {
          let subredditID = post.subreddit._id;
          let bodyTextForEachPost = post.body;
          this.setState({
            subredditId: subredditID,
            title: post.title,
            newBodyText: bodyTextForEachPost
          })
        })
        // return axios.get(`/api/sub/${this.state.subredditId}/post`)
      })
      .then(res => {
        console.log('SUCCESSFUL GET')
      })
  }

  render() {
    return (
      <div>
        <div>
          Title of post: <br />
          {this.state.title} <br /><br />
          Body: <ReactMarkdown source={this.state.newBodyText} />
        </div>
      </div>

    )
  }
}


export default ParentPost;