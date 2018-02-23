import axios from 'axios';
import LinkBar from '../../components/LinkBar.js';
import TextBox from '../../components/TextBox.js';
import SubredditNameBox from '../../components/subredditNameBox';
import React from 'react'
import exampleData from '../../../server/database/data.json'

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

  //client side requests here
  // '/api/sub/1asdfasasdfasdfdf/post'
  createNewTextPost = (titleText, type, bodyText, url) => {
    //get list of subreddits
    //if text in the subreddit title box = subreddit's title key
    //get that subreddit's ID
    //pass that id to the POST request
    axios.get('/api')
      .then(res => {
        let responseArr = JSON.parse(res.request.response)
        responseArr.forEach(responseData => {
          console.log('responsedata', responseData.subreddit.title)
        })
        if (res.subreddit.title === this.state.subredditText) {
          return this.setState({ subredditId: res.subreddit._id })
        }
      })
      .then(res => {
        axios.post(`/api/sub/${this.state.subredditId}/post`, { title: titleText, type: this.state.type, body: bodyText })
      })
      .then(res => {
        console.log('SUCCESSFUL TEXT POST')
      })
    //work on changing the type here
    // if (this.state.type === 'text') {
    //   //POST 404 - figure out how to get subId ! 
    //   axios.post('/api/sub/:subId/post', { title: titleText, type: this.state.type, body: bodyText })
    //     .then(res => {
    //       console.log('SUCCESSFUL TEXT POST')
    //     })

    // }
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

