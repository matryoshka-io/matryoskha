import React from 'react';

class SubredditNameBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="subredditNameBox">
        <textarea rows="1" cols="80" value={this.props.subredditNameText} onChange={this.props.onSubredditTextChangeHandler}></textarea>
      </div>
    );
  }
}

export default SubredditNameBox;
