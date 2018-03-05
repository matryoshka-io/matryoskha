import { Component } from 'react';
import fetch from 'isomorphic-unfetch';

import Page from '../components/Page';
import Post from '../components/Post';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import auth from '../utils/auth';
import data from '../utils/data';
import profile from '../utils/profile';
import vote from '../utils/votes';
import sessions from '../utils/sessions';
import ParentPost from '../components/ParentPost';

import { BASE_URL } from '../../app.config';

class PostDetailPage extends Component {
  static async getInitialProps(context) {
    console.log('context', context.query.post)
    const session = await auth.initializeSession(context);
    const post = await fetch(`${BASE_URL}/api/post/${context.query.post}`);
    const json = await post.json();
    return {
      user: session.user,
      subreddit: context.query.subTitle,
      post: json,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      subreddit: this.props.post.subreddit,
      user: this.props.post.user,
      post: this.props.post,
    };
  }

  render() {
    return (
      <Page title={this.state.title}>

        <div className="pageContent">
          <div className="posts" >
            <ParentPost {...this.state.post} />
          </div>
          <div className="sidebar" >
            <UserPanelBody
              user={this.state.user}
              login={this.loginUser}
              logout={this.logoutUser}
            />
            <SubredditPanelBody
              subreddit={this.state.subreddit}
              subscribe={this.subscribe}
            />
          </div>
        </div>
        <style jsx>
          {`
            .pageContent {
              width: 100%;
            }
            h1 {
              font-size: 36px;
              color: #333;
              align-text: center;
            }
            h2 {
              margin-left: 16px;
            }
            .posts {
              border: solid 2px;
              float: left;
              width: 75%;
            }
            .sidebar {
              border: solid 2px;
              float: right;
              width: 22%;
              min-width: 200px;
              height: 80%;
            } * {
              border:1
            }
          `}
        </style>
      </Page>
    );
  }
}

export default PostDetailPage;
