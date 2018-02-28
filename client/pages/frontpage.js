import { Component } from 'react';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';

import Data from '../../server/database/dataFrontEnd.json';
import auth from '../utils/auth';
import data from '../utils/data';
import sessions from '../utils/sessions';


class Frontpage extends Component {
  static async getInitialProps(context) {
    const title = context.query.sub !== undefined && context.query.sub !== null ? context.asPath : 'Matryoshka: The Internet, Stacked';
    console.log('PAGE QUERY PARAMS: ', context.query);
    console.log('asPath', context.asPath);

    const session = await auth.initializeSession(context);
    const posts = await data.getPosts(session, context.query.sub);

    return {
      title,
      user: session.user,
      token: session.token,
      posts,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      user: this.props.user,
      token: this.props.token,
      posts: this.props.posts,
    };
    this.loginUser = this.loginUser.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
  }

  componentWillMount() {
    // ensure session is cleared on client
    if (!this.state.user) {
      sessions.deleteCookie('jwt');
    }
  }

  refreshPosts() {
    data.getPosts({ user: this.state.user, token: this.state.token })
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

  render() {
    return (
      <Page title={this.state.title}>
        <div className="pageContent">
          <div className="posts" >
            <Posts posts={this.state.posts} />
          </div>
          <div className="login" >
            <UserPanelBody user={this.state.user} login={this.loginUser} />
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
