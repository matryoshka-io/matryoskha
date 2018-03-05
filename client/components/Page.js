import Logo from './Logo';
import UserPanelHeader from './UserPanelHeader';
import Nav from './Nav';
import Footer from './Footer';

export default ({ user, subreddit, karma, subscriptions, title, children }) => (
  <div className="main">
    <div className="header">
      <div className="header__logo">
        <a className="logo" href="/">
          <img src="/static/logo.png" alt="logo1" border="0" height={60} />
        </a>
        <div className="mat">
          <img src="/static/mat.png" height={60} />
        </div>
      </div>
      <div className="header__user">
        <UserPanelHeader
          user={user}
          karma={karma}
          subscriptions={subscriptions}
        />
      </div>
    </div>
    <Nav subreddit={subreddit} />
    <div className="page">
      {children}
    </div>
    <div className="footerContainer">
      <Footer />
    </div>
    <style jsx global>
      {`

        @import url('https://fonts.googleapis.com/css?family=PT+Mono|PT+Serif:400,700');

        body {
          font-family: 'PT Mono';
          font-size: 12px;
          margin: 0px;
          padding: 8px;
          background: url('/static/background.png') top center no-repeat;
          background-size: cover;
          min-height: 100vh;
        }
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .header__logo {
          flex: 1;
          align-self: flex-start;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        .header__user {
          flex: 1;
          align-self: flex-end;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
        .page {
          padding: 8px;
        }
        input {
          height: 24px;
          font-size: 14px;
          text-align: center;
        }
        .button {
          margin: 4px;
          border: solid 1px #333;
          width: 85%;
          height: 24px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .button:hover {
          cursor: pointer;
        }
        h1, h2, h3, h4 {
          font-family: 'PT Serif';
          font-weight: 700;
        }
        h1 {
          font-size: 36px;
          line-height: 42px;
        }
        h2 {
          font-size: 28px;
          line-height: 36px;
        }
        h3 {
          font-size: 20px;
          line-height: 28px;
        }
        a {
          color: #696775;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          padding: 2px 4px;
        }
        a:hover {
          color: #fff;
          background-color: #696775;
          border-radius: 2px;
        }
        .primary {

        }
        .secondary {

        }
      `}
    </style>
    <style jsx>
      {`
        a.logo {
          cursor: pointer;
        }
        a.logo:hover {
          background-color: rgba(0,0,0,0);
        }
        .footerContainer {
          margin: 50px 0 50px 0;
          display: block;
          width: 100%;
        }
        .mat {
          text-align: center;
        }
        .main {
          width: 95%;
          margin: auto;
          padding: 10px 0 0 0;
        }
        .page {
          padding: 3px 10px;
          display: flex;
        }
        @media (max-width: 750px) {
          .main {
            padding: 0;
            width: auto;
          }
        }
      `}
    </style>
  </div>
);
