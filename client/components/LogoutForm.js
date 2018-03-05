import { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import auth from '../utils/auth';

const LogoutForm = ({ user, logout }) => (
  <div>
    <h3>Hey there, {user}</h3>
    <p>It appears you're already logged in.  Would you like to log out?</p>
    <button className="button" onClick={logout}>Log Me Out!</button>
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

export default LogoutForm;
