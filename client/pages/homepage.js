import { Component } from 'react';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';

import Data from '../../server/database/dataFrontEnd.json';
import auth from '../utils/auth';
import sessions from '../utils/sessions';


class Homepage extends Component {
  static async getInitialProps(context) {
    const session = await auth.initializeSession(context);
    return {
      user: session.user,
      token: session.token,
      posts: Data,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
    this.loginUser = this.loginUser.bind(this);
  }

  componentWillMount() {
    // ensure session is cleared on client
    if (!this.state.user) {
      sessions.deleteCookie('jwt');
    }
  }

  loginUser(username, password) {
    auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          sessions.setCookie('jwt', result.token);
          this.setState({
            user: result.user,
          }, () => console.log(this.state.user));
          return;
        }
        sessions.deleteCookie('jwt');
        this.setState({
          user: null,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { user, posts } = this.props;
    return (
      <Page>
        <div className="pageContent">
          <div className="posts" >
            <Posts myPosts={posts} />
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

export default Homepage;
