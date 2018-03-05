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
          <div>
            <button className="button primary" onClick={this.submitLogin}>Login</button>
            <Link href="/signup"><button className="button secondary">Register</button></Link>
          </div>
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
            .button {
              margin: 4px;
              border: solid 1px #333;
              width: 80px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
            }
            .button:hover {
              cursor: pointer;
            }
            .primary {

            }
            .secondary {
            }
          `}
        </style>
      </div>
    );
  }
}
