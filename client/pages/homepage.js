<<<<<<< HEAD
=======
import { Component } from 'react';

>>>>>>> [auth] pre-reboot
import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';

import Data from '../../server/database/dataFrontEnd.json';
import auth from '../utils/auth';
import sessions from '../utils/sessions';

<<<<<<< HEAD
const Homepage = props => (
  <Page>
    <div className="pageContent">
      <div className="posts" >
        <Posts myPosts={props.posts} />
      </div>
      <div className="login" >
        <UserPanelBody user={props.user} />
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

Homepage.getInitialProps = async function GetInitialPropsForHomepage(context) {
  const token = sessions.getToken('jwt', context.req);
  const tokenData = await auth.authenticateToken(token);
  return {
    user: tokenData.user || null,
    token,
    posts: Data,
  };
};
=======

class Homepage extends Component {
  static async getInitialProps(context) {
    // getInitialProps runs server side only, unless a client-side redirect / route
    const token = sessions.getToken('jwt', context.req);
    let currentUser = null;

    if (token) {
      const tokenCheck = await auth.authenticateToken(token);
      console.log(tokenCheck);
      if (tokenCheck.session) {
        currentUser = tokenCheck.content.user;
        sessions.setCookie('jwt', tokenCheck.token); // refreshed expiry
      } else {
        sessions.deleteCookie('jwt');
      }
    }

    return {
      user: currentUser,
      token,
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
>>>>>>> [auth] pre-reboot

export default Homepage;
