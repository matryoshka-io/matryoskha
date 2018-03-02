import { Component } from 'react';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import utils from '../utils';

class Frontpage extends Component {
  static async getInitialProps(context) {
    const initialProps = utils.data.prepPostListView(context);
    return initialProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      subreddit: this.props.subreddit,
      title: this.props.title,
      user: this.props.user,
      token: this.props.token,
      subscriptions: this.props.subscriptions,
      posts: this.props.posts,
    };
    this.loginUser = this.loginUser.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    // ensure session is cleared on client
    if (!this.state.user) {
      utils.sessions.deleteCookie('jwt');
    }
    // this.refreshPosts();
  }

  castVote(id) {
    utils.vote.castVote(id)
      .then(result => console.log('voted'))
      .catch(err => console.log('no vote'));
  }

  refreshPosts() {
    utils.data.getPosts({ user: this.state.user, token: this.state.token }, this.state.subreddit)
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
            token: result.token,
          }, () => {
            this.refreshPosts();
          });
          return;
        }
        utils.sessions.deleteCookie('jwt');
        this.setState({
          user: null,
          token: null,
        }, () => {
          this.refreshPosts();
        });
      })
      .catch(err => console.log(err));
  }

  logoutUser() {
    // todo: submit token value to backend for blacklist
    utils.sessions.deleteCookie('jwt');
    this.setState({
      user: null,
      token: null,
    }, () => this.refreshPosts());
  }

  subscribe() {
    console.log('hello');
    if (this.state.subreddit && this.state.user) {
      console.log(`SUBCRIBE REQUEST: ${this.state.subreddit}`);
      utils.data.subscribe({ user: this.state.user, token: this.state.token }, this.state.subreddit)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <Page title={this.state.title}>
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
              subscriptions={this.state.subscriptions}
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

export default Frontpage;
