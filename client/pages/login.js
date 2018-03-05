import { Component } from 'react';
import Router from 'next/router';

import utils from '../utils';

import LogoutForm from '../components/LogoutForm';
import LoginForm from '../components/LoginForm';
import Page from '../components/Page';

class LoginPage extends Component {
  static async getInitialProps(context) {
    const session = utils.auth.initializeSession(context);
    const profile = utils.data.prepUserProfile(session);
    return {
      user: session.user,
      karma: profile.karma,
      subscriptions: profile.subscriptions,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      karma: this.props.karma,
    };
    console.log(this.state);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  loginUser(username, password) {
    utils.auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          utils.sessions.setCookie('jwt', result.token);
          Router.replace('/');
          return;
        }
        utils.sessions.deleteCookie('jwt');
      })
      .catch(err => console.log(err));
  }

  logoutUser() {
    utils.sessions.deleteCookie('jwt');
    this.setState({
      user: null,
      karma: null,
    }, () => Router.replace(this.props.url.asPath));
  }

  render() {
    if (this.state.user) {
      return (
        <Page
          user={this.state.user}
          karma={this.state.karma}
          logout={this.logoutUser}
        >
          <LogoutForm
            user={this.state.user}
            logout={this.logoutUser}
          />
        </Page>
      );
    }
    return (
      <Page>
        <div className="centered">
          <LoginForm login={this.loginUser} />
        </div>
        <style jsx>
          {`
            .centered {
              margin: 0 auto;
            }
          `}
        </style>
      </Page>
    );
  }
}

export default LoginPage;
