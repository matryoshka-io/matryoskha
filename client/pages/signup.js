import { Component } from 'react';
import Router from 'next/router';

import SignupForm from '../components/SignupForm';
import Page from '../components/Page';
import auth from '../utils/auth';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(username, password) {
    const result = auth.registerUser(username, password);
    if (result.success) {
      Router.replace('/');
    } else {
      this.setState({
        message: result.message,
      }, setTimeout(() => this.setState({ message: '' }), 3000));
    }
  }

  render() {
    return (
      <Page>
        <SignupForm
          submitForm={this.registerUser}
          message={this.state.message}
        />
      </Page>
    );
  }
}

SignupPage.getInitialProps = async function GetInitialPropsForRegistrationPage(context) {
  // check for session state
  //    if session is active, redirect?
  //    if not, continue
  return {};
};

export default SignupPage;
