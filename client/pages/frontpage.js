import { Component } from 'react';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';
import SubredditPanelBody from '../components/SubredditPanelBody';

import Data from '../../server/database/dataFrontEnd.json';
import auth from '../utils/auth';
import data from '../utils/data';
import profile from '../utils/profile';
import vote from '../utils/votes';
import sessions from '../utils/sessions';

class Frontpage extends Component {
  static async getInitialProps(context) {
    const title = context.query.sub !== undefined && context.query.sub !== null ? context.asPath : 'Matryoshka: The Internet, Stacked';
    const subreddit = context.query.sub === null || context.query.sub === 'null' ? null : context.query.sub;

    const session = await auth.initializeSession(context);
    const posts = await data.getPosts(session, subreddit);

    const initialProps = {
      subreddit,
      title,
      user: session.user,
      token: session.token,
      posts,
    };
    return initialProps;
  }

  constructor(props) {
    super(props);
    // const posts = JSON.parse(this.props.posts);
    this.state = {
      subreddit: this.props.subreddit || null,
      title: this.props.title || 'Hello',
      user: this.props.user || null,
      token: this.props.token || null,
      posts: this.props.posts,
    };
    this.loginUser = this.loginUser.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
  }

  componentDidMount() {
    // ensure session is cleared on client
    if (!this.state.user) {
      sessions.deleteCookie('jwt');
    }
    // this.refreshPosts();
  }

  castVote(id) {
    vote.castVote(id)
      .then(result => console.log('voted'))
      .catch(err => console.log('no vote'));
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

  loginUser(username, password) {
    auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          sessions.setCookie('jwt', result.token);
          this.setState({
            user: result.user,
            token: result.token,
          }, () => {
            console.log(this.state.user);
            // this.refreshPosts();
          });
          return;
        }
        sessions.deleteCookie('jwt');
        this.setState({
          user: null,
          token: null,
        }, () => {
          // this.refreshPosts();
          console.log(this.state.user);
        });
      })
      .catch(err => console.log(err));
  }

  logoutUser() {
    // todo: submit token value to backend for blacklist
    sessions.deleteCookie('jwt');
    this.setState({
      user: null,
      token: null,
    }, () => this.refreshPosts());
  }

  subscribe() {
    if (this.state.subreddit && this.state.user) {
      profile.subscribe({ user: this.state.user, token: this.state.token }, this.state.subreddit)
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

export default Frontpage;
