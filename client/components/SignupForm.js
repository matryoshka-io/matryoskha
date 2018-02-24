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
      <form>
        <div>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <div>
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={this.getCredential}
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={this.getCredential}
            />
          </div>
          <div>
            <p>Repeat Password</p>
            <input
              type="password"
              placeholder="Repeat Password"
              name="passwordr"
              onChange={this.getCredential}
            />
          </div>
          <strong>{this.props.message}</strong>
          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
          <div className="clearfix">
            <button type="button" className="cancelbtn">Cancel</button>
            <button type="button" className="signupbtn" onClick={this.submitUser}>Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}
