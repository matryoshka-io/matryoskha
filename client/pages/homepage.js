import { Component } from 'react';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import profile from '../utils/profile';
import data from '../utils/data';
import sessions from '../utils/sessions';


class Homepage extends Component {
  static async getInitialProps(context) {
    const initialProps = data.prepPostView(context);
    return initialProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      subreddit: this.props.subreddit,
      user: this.props.user,
      token: this.props.token,
      posts: this.props.posts,
    };
    this.loginUser = this.loginUser.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentWillMount() {
    // ensure session is cleared on client
    if (!this.state.user) {
      sessions.deleteCookie('jwt');
    }
  }

  refreshPosts() {
    data.getPosts({ user: this.state.user, token: this.state.token }, this.state.subreddit)
      .then((posts) => {
        this.setState({
          posts,
        });
      })
      .catch(err => console.log(err));
  }

  subscribe() {
    if (this.state.subreddit && this.state.user) {
      profile.subscribe({ user: this.state.user, token: this.state.token }, this.state.subreddit)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  }

  logoutUser() {
    // todo: submit token value to backend for blacklist
    sessions.deleteCookie('jwt');
    this.setState({
      user: null,
      token: null,
    }, () => this.refreshPosts());
  }

  loginUser(username, password) {
    auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          sessions.setCookie('jwt', result.token);
          this.setState({
            user: result.user,
            token: result.token,
          }, () => this.refreshPosts());
          return;
        }
        sessions.deleteCookie('jwt');
        this.setState({
          user: null,
          token: null,
        }, () => this.refreshPosts());
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Page>
        <div className="pageContent">
          <div className="posts" >
            <Posts posts={this.state.posts} />
          </div>
          <div className="login" >
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
            .login {
              border: solid 2px;
              float: right;
              width: 22%;
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

export default Homepage;
