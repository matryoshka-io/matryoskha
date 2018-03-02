import { Component } from 'react';

import 'isomorphic-fetch';

class Comment extends Component {
  static async getInitialProps({ query }) {
    const comment = await fetch(`http://localhost:3000/api/comment/${query.comment}`);
    const json = await comment.json();

    return {
      comment: json,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment, // wat, why the 'this', and can't I just do this.state = props; ?
    };
  }

  render() {
    return (
      <div>
        {this.state.comment.body}
      </div>
    );
  }
}

export default Comment;
