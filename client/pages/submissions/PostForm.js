import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import LinkBar from '../../components/LinkBar.js';
import TextBox from '../../components/TextBox.js';
import React from 'react'

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      // bodyText: '',
      isTextBoxHidden: false,
      isLinkBarHidden: true,
      selectedType: '',
      type: 'text'
    }
  }

  onTitleTextChangeHandler = (e) => {
    this.setState({
      titleText: e.target.value
    })
  }

  //text posts can't have links & links cannot have texts
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
  createNewTextPost = (titleText, type, bodyText, url) => {
    //work on changing the type here
    if (this.state.type === 'text') {
      axios.post('/api/sub/:subId/post', { title: titleText, type: this.state.type, body: bodyText })
        .then(res => {
          console.log('SUCCESSFUL TEXT POST')
        })
    }
    //work on links later
  }

  render() {
    return (
      <div className="postSubmission">
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


        {/* Markdown render test here */}
        {/* <ReactMarkdown source={this.state.bodyText} /> */}

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
      </div>
    )
  }
}


export default PostForm;

