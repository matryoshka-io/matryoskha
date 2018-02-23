import React from 'react';

class SubredditNameBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subredditNameText: ''
    }
  }

  onSubredditNameBoxChangeHandler = (e) => {
    this.setState({
      subredditNameText: e.target.value
    }, () => {
      console.log('box text', this.state.subredditNameText)
    })
  }

  render() {
    return (
      <div id="subredditNameBox">
        <textarea rows="1" cols="80" value={this.state.subredditName} onChange={this.onSubredditNameBoxChangeHandler}></textarea>
      </div>
    )
  }
}

export default SubredditNameBox;