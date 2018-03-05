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
    console.log(`register ${username}, ${password}`);
    const app = this;
    auth.registerUser(username, password)
      .then((result) => {
        console.log('RESULT: ', result);
        if (result.success) {
          Router.replace('/');
        } else {
          app.setState({
            message: result.message,
          }, () => setTimeout(() => app.setState({ message: '' }), 3000));
        }
      })
      .catch((err) => {
        console.log('ERROR: ', err);
        app.setState({
          message: err.message,
        }, () => setTimeout(() => app.setState({ message: ''}), 3000));
      });
  }

  render() {
    return (
      <Page title="Register for an account" >
        <SignupForm
          submitForm={this.registerUser}
        />
      </Page>
    );
  }
}

SignupPage.getInitialProps = async function GetInitialPropsForRegistrationPage(context) {
  const session = auth.initializeSession(context);
  return {
    user: session.user,
  };
};

export default SignupPage;
