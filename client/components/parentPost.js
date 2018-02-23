// import Link from 'next/link'
// import SubRedditBar from './subbredditBar'
// import Rating from './rating'

// export default ({_id, subreddit, title, body, date, comments}) => (

//   <div style={{'border': 'solid', 'margin' : '10px', 'padding': '10px'}}>
//      <Link href={subreddit}><a>{subreddit.title}</a></Link>
//      <span style={{'float': 'right'}}>created at: {subreddit.date}</span>
//      <div>desc: {subreddit.description}</div>
//      <Rating />
//      <div>
//        <SubRedditBar className="subbredditbar"/>
//      </div>
//      <style jsx>{`
//        .subbredditbar {
//          float: left
//        }
//      `}
//      </style>
//    </div>

// )

import Link from 'next/link'
import SubRedditBar from './subbredditBar'
import Rating from './rating'
import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'


class ParentPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subreddit: '',
      newBodyText: ''
    }
  }

  componentDidMount = () => {
    axios.get('/api')
      .then(res => {
        return res.data.forEach(post => {
          let subredditID = post.subreddit._id;
          let bodyTextForEachPost = post.body
          this.setState({
            subredditId: subredditID,
            newBodyText: bodyTextForEachPost
          })
        })
        // return axios.get(`/api/sub/${this.state.subredditId}/post`)
      })
      .then(res => {
        console.log('res', res)
      })
  }

  render() {
    return (
      <div>
        <div>
          <ReactMarkdown source={this.state.newBodyText} />
        </div>
      </div>

    )
  }
}


export default ParentPost;