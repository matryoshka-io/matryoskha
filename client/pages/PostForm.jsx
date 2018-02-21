const React = require('react');
const ReactMarkdown = require('react-markdown');

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      bodyText: '',
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
    this.setState({ bodyText: e.target.value }, () => {
      console.log(this.state.bodyText)
    })
  }



  render() {
    return (
      <div className="postSubmission">
        Title: <br />
        <textarea rows="1" cols="50" value={this.state.titleText} onChange={this.onTitleTextChangeHandler}>
        </textarea> <br />

        Type:
        <select id="typeDropdown" onChange={this.dropdownChangeHandler} >
          <option value="text" >Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <br />

        Video/Img Link: <br />
        <input val="text" /> <br />

        Text: <br />
        <textarea row="5" cols="50" value={this.state.bodyText} onChange={this.onBodyTextChangeHandler}>
        </textarea>

        {/* Renders HTML text -- move Rendering to component you want it rendered in - Profile & subreddit! */}
        <ReactMarkdown source={this.state.bodyText} />

        <button>Post!</button>
      </div>
    )
  }
}


export default PostForm;

