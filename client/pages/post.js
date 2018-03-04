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
import ParentPost from '../components/ParentPost'

import 'isomorphic-fetch';

class PostDetailPage extends Component {
  static async getInitialProps({ query }) {
    const post = await fetch(`http://localhost:3000/api/post/${query.post}`);
    const json = await post.json();
    return json;
  }


  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <Page title={this.state.title}>

        <div className="pageContent">
          <div className="posts" >
            <ParentPost {...this.state} />
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
