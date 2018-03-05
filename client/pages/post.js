import { Component } from 'react';
import fetch from 'isomorphic-unfetch';

import Page from '../components/Page';
import Post from '../components/Post';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import utils from '../utils';
import ParentPost from '../components/ParentPost';

import { BASE_URL } from '../../app.config';

class PostDetailPage extends Component {
  static async getInitialProps(context) {
    const pageContext = await utils.data.prepPostDetailView(context);
    const post = await fetch(`${BASE_URL}/api/post/${context.query.post}`);
    const json = await post.json();
    pageContext.subreddit = context.query.subTitle;
    pageContext.post = json;
    return pageContext;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      post: this.props.post,
      karma: this.props.karma,
      subreddit: this.props.subreddit,
      subscribed: this.props.subscribed,
      subscriptions: this.props.subscriptions,
    };
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  loginUser(username, password) {
    utils.auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          utils.sessions.setCookie('jwt', result.token);
          this.setState({
            user: result.user,
          }, () => {
            this.refreshPosts();
          });
          return;
        }
        utils.sessions.deleteCookie('jwt');
        this.setState({
          user: null,
        }, () => {
          this.refreshPosts();
        });
      })
      .catch(err => console.log(err));
  }

  logoutUser() {
    utils.sessions.deleteCookie('jwt');
    this.setState({
      user: null,
    }, () => this.refreshPosts());
  }

  render() {
    return (
      <Page
        subreddit={this.state.subreddit}
        title={this.props.title}
        user={this.state.user}
        karma={this.state.karma}
        subscriptions={this.state.subscriptions}
      >

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
              subscribed={this.state.subscribed}
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
