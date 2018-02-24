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
  }

  getInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(username, password) {
    if (this.state.username.trim() && this.state.password.trim()) {
      auth.loginUser(this.state.username, this.state.password)
        .then((result) => {
          if (result.success) {
            alert('login successful');
            // Router.replace('/');
          }
          this.setState({
            message: result.message,
          });
        })
        .catch((err) => {
          this.setState({
            message: err.message,
          })
        });
    }
  }

  render() {
    return (
      <form>
        <div className="login">
          <h1>Login</h1>
          <div>
            <span>name</span>
            <input id="username" className="usernameInput" onChange={this.getInputValue} />
          </div>
          <span>password</span>
          <div>
            <input type="password" className="passwordInput" onChange={this.getInputValue} />
          </div>
          <span>{this.state.message}</span>
          <div>
            <button className="loginButton" onClick={this.submitForm}>Login</button>
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
      </form>
    );
  }


}
