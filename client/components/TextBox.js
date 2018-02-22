import React from 'react';
import axios from 'axios';

class TextBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bodyText: ''
    }
  }

  onBodyTextChangeHandler = (e) => {
    this.setState({ bodyText: e.target.value }, () => {
      console.log(this.state.bodyText)
    })
  }

  render() {
    return (
      < div >
        Text: <br />
        <textarea row="8" cols="80" value={this.bodyText} onChange={this.onBodyTextChangeHandler}>
        </textarea>
      </div >
    )
  }
}

export default TextBox;