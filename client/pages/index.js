// import Homepage from './homepage';

// export default Homepage;

// class Page extends React.Component {
//     static async getInitialProps(args) {
//       let ourPosts = await res.json() // supposedly an array of objects, an object will be individual Post
//       post = {
//           Title: String,
//           UserId: Number, //the userId associated with it
//           Body: String, //or the content of the subReddit Link and Image will be part of it
//           Votes: Number, //the ranking will be based on the number of votes from the users
//           Date: Date, // the date the subReddit was created
//           Comments: Obj // comments object might be the heaviest commponent in terms of data
//           //it will include all the comments or all nested nodes of content

//       }
//         return {
//             jsonData: post
//         }
//     }
//     render() {
//       return (
//           <Page>
//               <Nav />
//               <Posts />
//           </Page>
//       )
//     }
//   }
import PostForm from '../pages/submissions/PostForm.js'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subredditId: '',
      newBodyText: ''
    }
  }

  componentDidMount = () => {
    axios.get('/api')
      .then(res => {
        console.log(res.data) //this is our textpost
        return res.data.forEach(post => {
          let subredditID = post.subreddit._id;
          let bodyTextForEachPost = post.body
          res.data.body ? <ReactMarkdown source={bodyTextForEachPost} /> : null
          this.setState({
            subredditId: subredditID,
            newBodyText: bodyTextForEachPost
          })
        })
        return axios.get(`/api/sub/${this.state.subredditId}/post`)
      })
      .then(res => {
        console.log('res', res)
      })

    // axios.get('/api/sub/')
    //   .then(res => {
    //     console.log('res', res.data.body)
    //   })
  }

  // getBodyTextFromDB = () => {
  //   axios.get('/')
  //     .then(res => {
  //       console.log('res on post', res)
  //     })
  // }



  render() {
    return (
      <div>
        {this.state.newBodyText}
      </div>
    )
  }
}

export default Index;
