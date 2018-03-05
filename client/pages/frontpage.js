import { Component } from 'react';
import Router from 'next/router';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import utils from '../utils';

class Frontpage extends Component {
  static async getInitialProps(context) {
    const initialProps = await utils.data.prepPostListView(context);
    return initialProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      subreddit: this.props.subreddit,
      title: this.props.title,
      user: this.props.user,
      subscribed: this.props.subscribed,
      subscriptions: this.props.subscriptions,
      karma: this.props.karma,
      posts: this.props.posts,
    };
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.castVote = this.castVote.bind(this);
  }

  componentDidMount() {
    if (!this.state.user) {
      utils.sessions.deleteCookie('jwt');
    }
  }

  castVote(voted, id, choice) {
    if (voted !== choice && this.state.user) {
      utils.votes.castVote({ user: this.state.user, token: utils.sessions.getToken('jwt') }, id, choice)
        .then((result) => {
          let postUpdate = [...this.state.posts];
          postUpdate = utils.votes.setVoteInPosts(postUpdate, { _id: id, choice }, voted);
          this.setState({
            posts: postUpdate,
          });
        })
        .catch(err => console.log('Vote Failed'));
    }
  }

  refreshPosts() {
    utils.data.getPosts({ user: this.state.user, token: utils.sessions.getToken('jwt') }, this.state.subreddit)
      .then((posts) => {
        this.setState({
          posts,
        });
      })
      .catch(err => console.log(err));
  }

  loginUser(username, password) {
    utils.auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          utils.sessions.setCookie('jwt', result.token);
          this.setState({
            user: result.user,
          }, () => {
            Router.replace(this.props.url.asPath);
          });
          return;
        }
        utils.sessions.deleteCookie('jwt');
        this.setState({
          user: null,
        }, () => {
          Router.replace(this.props.url.asPath);
        });
      })
      .catch(err => console.log(err));
  }

  logoutUser() {
    utils.sessions.deleteCookie('jwt');
    this.setState({
      user: null,
    }, () => Router.replace(this.props.url.asPath));
  }

  subscribe() {
    if (this.state.subreddit && this.state.user) {
      if (!this.state.subscribed) {
        utils.data.subscribe({ user: this.state.user, token: utils.sessions.getToken('jwt') }, this.state.subreddit)
          .then(result => this.setState({ subscribed: true }))
          .catch(err => console.log(err));
      } else {
        utils.data.unsubscribe({ user: this.state.user, token: utils.sessions.getToken('jwt') }, this.state.subreddit)
          .then(result => this.setState({ subscribed: false }))
          .catch(err => console.log(err));
      }
    }
  }

  render() {
    return (
      <Page
        subreddit={this.state.subreddit}
        title={this.state.title}
        user={this.state.user}
        karma={this.state.karma}
        subscriptions={this.state.subscriptions}
        logout={this.logoutUser}
      >
        <div className="pageContent">
          <div className="posts" >
            <Posts
              posts={this.state.posts}
              vote={this.castVote}
            />
          </div>
          <div className="sidebar" >
            <UserPanelBody
              user={this.state.user}
              login={this.loginUser}
              logout={this.logoutUser}
            />
            <SubredditPanelBody
              subscribed={this.state.subscribed}
              subreddit={this.state.subreddit}
              subscribe={this.subscribe}
            />
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
                padding-top: 30px;
                float: left;
                width: 75%;
              }
              .sidebar {
                padding-top: 30px;
                float: right;
                width: 22%;
                min-width: 200px;
                height: 80%;
              } * {
                border:1
              }
            `}
          </style>
        </div>
      </Page>
    );
  }
}

export default Frontpage;