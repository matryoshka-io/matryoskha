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
      this.props.login(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <div>
        <div className="login">
          <h3>Login</h3>
          <input name="username" className="usernameInput" placeholder="username" onChange={this.getInputValue} />
          <input name="password" type="password" className="passwordInput" placeholder="password" onChange={this.getInputValue} />
          <button className="button primary" onClick={this.submitLogin}>Login</button>
          <Link href="/signup"><button className="button secondary">Register</button></Link>
        </div>
        <style jsx>
          {`
            h3 {
                text-align: center
            }
            .login {
              height: 200px;
              padding: 8px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
            }
            .login > * {
              margin: 2px;
            }
            .login input {
              height: 24px;
              font-size: 14px;
              text-align: center;
            }
            .login .button {
              width: 100%;
              margin-left: 0px;
              margin-right: 0px;
            }
          `}
        </style>
      </div>
    );
  }
}
