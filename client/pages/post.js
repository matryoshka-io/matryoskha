import { Component } from 'react';

import Page from '../components/Page';
import Post from '../components/Post';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import auth from '../utils/auth';
import data from '../utils/data';
import profile from '../utils/profile';
import vote from '../utils/votes';
import sessions from '../utils/sessions';

import 'isomorphic-fetch';

class PostDetailPage extends Component {
  /* static async getInitialProps(context) {
    const initialProps = await data.prepPostDetailView(context);
    return initialProps;
  } */

  static async getInitialProps({ query }) {
    const post = await fetch(`http://localhost:3000/api/post/${query.post}`);
    const json = await post.json();
  
    return {
      title: json.title,
      body: json.body, 
    };
  }

  constructor(props) {
    super(props);
    /* this.state = {
      title: this.props.title,
      subreddit: this.props.subreddit,
      user: this.props.user,
      post: {},
      comments: [],
    } */
    this.state = {
      title: props.title,
      body: props.body,
    };
  }

  render() {
    return (
      <Page title={this.state.title}>
        {this.state.body}
      </Page>
    );
  }
}

export default PostDetailPage;
