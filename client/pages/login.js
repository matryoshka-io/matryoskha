import { Component } from 'react';
import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import Page from '../components/Page';
import auth from '../utils/auth';

const LoginPage = props => (
  <Page>
    <LoginForm />
  </Page>
);

LoginPage.getInitialProps = async function GetInitialPropsForRegistrationPage(context) {
  // check for session state
  //    if session is active, redirect?
  //    if not, continue
  return {};
};

export default LoginPage;
