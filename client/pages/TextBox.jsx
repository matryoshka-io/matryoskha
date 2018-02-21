const React = require('react');
const ReactMarkdown = require('react-markdown');

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class TextBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: '',
      bodyText: ''
    }
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
      <div>
        Title: <br />
        <textarea rows="1" cols="50" value={this.state.titleText} onChange={this.onTitleTextChangeHandler}>
        </textarea> <br />

        Text <br />
        <textarea row="5" cols="50" value={this.state.bodyText} onChange={this.onBodyTextChangeHandler}>
        </textarea>
        {/* Renders HTML text */}
        <ReactMarkdown source={this.state.bodyText} />

        <button>Post!</button>
      </div>
    )
  }
}


export default TextBox;

