import { Component } from 'react';

import 'isomorphic-fetch';

class Post extends Component {
  static async getInitialProps({ query }) {
    const post = await fetch(`http://localhost:3000/api/post/${query.post}`);
    const json = await post.json();

    return {
      post: json,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post, // wat, why the 'this', and can't I just do this.state = props; ?
    };
  }

  render() {
    return (
      <div>
        {this.state.post.body}
      </div>
    );
  }
}

export default Post;
