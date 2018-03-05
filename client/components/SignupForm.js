import React from 'react';
import auth from '../utils/auth';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getCredential = this.getCredential.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  getCredential(e) {
    const context = this;
    const { value, name } = e.target;
    context.setState({
      [name]: value,
    });
  }

  checkUsername() {
    return this.state.username.trim().length > 5;
  }

  checkPassword() {
    return this.state.password === this.state.passwordr;
  }

  submitUser() {
    if (this.checkUsername() && this.checkPassword()) {
      this.props.submitForm(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <div className="signup__form">
        <h3>Register for an Account</h3>
        <div>
          <input
            type="text"
            placeholder="username"
            name="username"
            required
            onChange={this.getCredential}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={this.getCredential}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            name="passwordr"
            onChange={this.getCredential}
          />
        </div>
        <strong>{this.props.message}</strong>
        <div className="clearfix">
          <button type="button" className="button primary" onClick={this.submitUser}>Sign Up</button>
        </div>
        <style jsx>
          {`
            h3 {
                text-align: center
            }
            .signup__form {
              margin: 0 auto;
              height: 300px;
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
              width: 95%;
            }
          `}
        </style>
      </div>
    );
  }
}
