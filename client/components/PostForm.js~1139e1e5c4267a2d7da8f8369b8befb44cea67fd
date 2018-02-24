import axios from 'axios';
import LinkBar from './LinkBar';
import TextBox from './TextBox'
import SubredditNameBox from './subredditNameBox';
import exampleData from '../../server/database/data.json'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      isTextBoxHidden: false,
      isLinkBarHidden: true,
      selectedType: '',
      type: 'text',
      subredditId: '',
      subredditText: ''
    }
  }

  onSubredditTextChangeHandler = (e) => {
    this.setState({ subredditText: e.target.value }, () => {
      console.log('in main form page', this.state.subredditText)
    })
  }

  onTitleTextChangeHandler = (e) => {
    this.setState({
      titleText: e.target.value
    })
  }

  //text posts can't have links & link posts can't have texts
  onDropdownChangeHandler = (e) => {
    if (e.target.value === 'text') {
      this.setState({
        type: 'text',
        isTextBoxHidden: false,
        isLinkBarHidden: true
      })
    }
    if (e.target.value === 'image') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        type: 'image'
      })
    }
    if (e.target.value === 'video') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        type: 'video'
      })
    }
  }

  onCreateNewTextPostWithUserText = () => {
    this.createNewTextPost(this.state.titleText, this.state.type, this.state.bodyText)
  }

  createNewTextPost = (titleText, type, bodyText, url) => {
    axios.get('/api')
      .then(res => {
        let responseArr = JSON.parse(res.request.response)
        console.log('our response', responseArr)
        responseArr.forEach(responseData => {
          let subredditTitle = responseData.subreddit.title;
          let subredditUniqueId = responseData.subreddit._id;
          if (subredditTitle === this.state.subredditText) {
            return this.setState({ subredditId: subredditUniqueId }, () => {
              console.log('ID?', this.state.subredditId)
            })
          } else {
            console.log('No such subreddit exists.')
            return res;
          }
        })
      })
      .then(res => {
        //will re-test this post when route is created
        axios.post(`/api/sub/${this.state.subredditId}`, { title: titleText, type: this.state.type, body: bodyText })
      })
      .then(res => {
        console.log('SUCCESSFUL TEXT POST')
      })
    //work on links later
  }

  render() {
    return (
      <div className="postSubmission">
        <h3>Submit a post</h3>

        <div id="subredditNameBox">
          Your subreddit:
          <SubredditNameBox onSubredditTextChangeHandler={this.onSubredditTextChangeHandler} />
        </div>

        Title: <br />
        <textarea rows="1" cols="80" value={this.state.titleText} onChange={this.onTitleTextChangeHandler}>
        </textarea> <br />



        Type:
        <select id="typeDropdown" onChange={this.onDropdownChangeHandler} >
          <option value="text" >Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <br />

        <div id="linkBar">
          {this.state.isLinkBarHidden ? null : <LinkBar />}
        </div>

        <div id="textbox">
          {this.state.isTextBoxHidden ? null : <TextBox />}
        </div>

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
      </div>
    )
  }
}

export default PostForm;

