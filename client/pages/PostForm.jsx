import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import LinkBar from './LinkBar.js'

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      bodyText: '',
      isBodyTextHidden: false,
      isLinkBarHidden: true,
      selectedType: '',
    }
  }

  onTitleTextChangeHandler = (e) => {
    this.setState({ titleText: e.target.value }, () => {
      console.log(this.state.titleText)
    })
  }

  onBodyTextChangeHandler = (e) => {
    console.log('bodytext', this.state.bodyText)
    this.setState({ bodyText: e.target.value }, () => {
      console.log(this.state.bodyText)
    })
  }

  onDropdownChangeHandler = (e) => {
    if (e.target.value === 'text') {
      this.setState({ isBodyTextHidden: false })
      this.setState({ isLinkBarHidden: true })
    }
    if (e.target.value === 'image') {
      this.setState({ isLinkBarHidden: false })
      this.setState({ isBodyTextHidden: true })
    }
    if (e.target.value === 'vide') {
      this.setState({ isLinkBarHidden: false })
      this.setState({ isBodyTextHidden: true })
    }
  }

  createNewTextPost = (titleText, selectedType, bodyText) => {
    // axios.post('user/:id/posts', { title: titleText, type: 'Text', body: bodyText })
    //   .then(res => {
    //     console.log('SUCCESSFUL TEXT POST')
    //   })

    console.log('am i working')
  }

  onCreateNewTextPostWithUserText = () => {
    this.createNewTextPost(this.state.titleText, this.state.type, this.state.bodyText)
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
          Text: <br />
          <textarea row="5" cols="50" value={this.state.bodyText} onChange={this.onBodyTextChangeHandler}>
          </textarea>
        </div>


        {/* Markdown render test here */}
        {/* <ReactMarkdown source={this.state.bodyText} /> */}

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
      </div>
    )
  }
}


export default PostForm;

