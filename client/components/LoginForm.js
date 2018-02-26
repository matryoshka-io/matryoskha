import { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import auth from '../utils/auth';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };
    this.getInputValue = this.getInputValue.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  getInputValue(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  submitLogin(username, password) {
    if (this.state.username.trim() && this.state.password.trim()) {

      this.props.submitForm(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <div>
        <div className="login">
          <h1>Login</h1>
          <div>
            <span>name</span>
            <input name="username" className="usernameInput" onChange={this.getInputValue} />
          </div>
          <span>password</span>
          <div>
            <input name="password" type="password" className="passwordInput" onChange={this.getInputValue} />
          </div>
          <span>{this.state.message}</span>
          <div>
            <button className="loginButton" onClick={this.submitLogin}>Login</button>
            <Link href="/signup"><button className="signinButton">Sign Up</button></Link>
          </div>
        </div>
        <style jsx>
          {`
            h1 {
                text-align: center
            }
            .usernameInput {
                margin-right: 100px;
            }
          `}
        </style>
      </div>
    );
  }
}
