import { Component } from 'react';

import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';

import Data from '../../server/database/dataFrontEnd.json';
import auth from '../utils/auth';
import sessions from '../utils/sessions';


class Homepage extends Component {
  static async getInitialProps(context) {
    // getInitialProps runs server side only, unless a client-side redirect / route
    const token = sessions.getToken('jwt', context.req);
    const tokenData = await auth.authenticateToken(token);
    // ensure previous token is cleared if token is no longer valid
    if (!tokenData.user) sessions.deleteCookie('jwt');
    return {
      user: tokenData.user || null,
      token,
      posts: Data,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  componentWillMount() {
    // ensure session is cleared on client
    if (!this.state.user) {
      sessions.deleteCookie('jwt');
    }
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
            <UserPanelBody user={user} />
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
