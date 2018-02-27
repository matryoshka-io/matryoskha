import { Component } from 'react';
import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import Page from '../components/Page';
import auth from '../utils/auth';

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
    this.submitLogin = this.submitLogin.bind(this);
  }

  loginUser(username, password) {
    auth.loginUser(username, password)
      .then(result => console.log(result))
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
