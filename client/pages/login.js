import { Component } from 'react';
import Router from 'next/router';

import auth from '../utils/auth';
import sessions from '../utils/sessions';

import LoginForm from '../components/LoginForm';
import Page from '../components/Page';

class LoginPage extends Component {
  static async getInitialProps(context) {
    // check for current session
    //  redirect if a session exists
    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(username, password) {
    auth.loginUser(username, password)
      .then((result) => {
        if (result.success) {
          sessions.setCookie('jwt', result.token);
          Router.replace('/');
          return;
        }
        sessions.deleteCookie('jwt');
        this.setState({
          message: 'Invalid Credentials',
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Page>
        <LoginForm login={this.loginUser} />
      </Page>
    );
  }
}

export default LoginPage;
