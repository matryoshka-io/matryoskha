import { Component } from 'react';
import Post from '../components/Post';
import Comment from './comment'; // wow, capitalization

import 'isomorphic-fetch';

class Postpage extends Component {
  static async getInitialProps({ query }) {
    const post = await fetch(`http://localhost:3000/api/post/${query.post}`);
    const json = await post.json();
    console.log(json);

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
    if (!this.state.post.comments.length) {
      return (
        <Post {...this.state.post} />
      );
    } else {
      return (
        <div>
          <Post {...this.state.post} />
          {this.state.post.comments.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
          })}       
        </div>
      );
    }
  }
}

export default Postpage;
