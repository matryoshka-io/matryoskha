const React = require('react');
const axios = require('axios')
const ReactMarkdown = require('react-markdown');

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      bodyText: '',
      isBodyTextHidden: false,
      selectedType: '',
    }
    this.onTitleTextChangeHandler = this.onTitleTextChangeHandler.bind(this);
    this.onBodyTextChangeHandler = this.onBodyTextChangeHandler.bind(this);
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
    }
    if (e.target.value === 'image') {

    }
    if (e.target.value === 'video') {

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

        {/* Video/Img Link: <br />
        <input val="text" /> <br /> */}

        Text: <br />
        <textarea row="5" cols="50" value={this.state.bodyText} onChange={this.onBodyTextChangeHandler}>
        </textarea>

        {/* Markdown render test here */}
        {/* <ReactMarkdown source={this.state.bodyText} /> */}

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
      </div>
    )
  }
}


export default PostForm;

