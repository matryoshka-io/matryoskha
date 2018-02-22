import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import LinkBar from './LinkBar.js'
import TextBox from './TextBox.js'

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      bodyText: '',
      isTextBoxHidden: true,
      isLinkBarHidden: true,
      selectedType: '',
      type: 'text'
    }
  }

  onDropdownChangeHandler = (e) => {
    if (e.target.value === 'text') {
      this.setState({ isTextBoxHidden: false })
      this.setState({ isLinkBarHidden: true })
    }
    if (e.target.value === 'image') {
      this.setState({ isLinkBarHidden: false })
      this.setState({ isTextBoxHidden: true })
      this.setState({ type: 'image' })
    }
    if (e.target.value === 'video') {
      this.setState({ isLinkBarHidden: false })
      this.setState({ isBodyTextHidden: true })
      this.setState({ type: 'video' })
    }
  }

  onCreateNewTextPostWithUserText = () => {
    this.createNewTextPost(this.state.titleText, this.state.type, this.state.bodyText)
  }

  createNewTextPost = (titleText, type, bodyText, url) => {
    //work on changing the type here
    if (type === 'text') {
      axios.post('/sub/:id/post/:id', { title: titleText, type: 'text', body: bodyText })
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
        <textarea rows="1" cols="50" value={this.state.titleText} onChange={this.onTitleTextChangeHandler}>
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

        <div id="textbar">
          {this.state.isBodyTextHidden ? null : <TextBox />}
        </div>


        {/* Markdown render test here */}
        {/* <ReactMarkdown source={this.state.bodyText} /> */}

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
      </div>
    )
  }
}


export default PostForm;

