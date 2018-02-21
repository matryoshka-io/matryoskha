const React = require('react');
const ReactMarkdown = require('react-markdown');

// const input = 'hello from **textbox** heheheheh'

// const TextBox = () => <ReactMarkdown source={input} />

class TextBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: ''
    }
  }

  onTitleTextChangeHandler = (e) => {
    this.setState({ titleText: e.target.value }, () => {
      console.log(this.state.titleText)
    })
  }

  render() {
    return (
      <div>
        <textarea rows="4" cols="50" defaultValue={this.state.titleText} onChange={this.onTitleTextChangeHandler}></textarea>
      </div>
    )
  }
}


export default TextBox;

