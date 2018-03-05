import Logo from './Logo';
import UserPanelHeader from './UserPanelHeader';
import Nav from './Nav';
import Footer from './Footer';

export default ({ user, subreddit, karma, subscriptions, title, children, logout }) => (
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
          logout={logout}
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
        input, select {
          height: 24px;
          font-size: 14px;
          text-align: center;
        }
        .button {
          margin: 4px;
          color: #f4ebce;
          background-color: #696775;
          height: 30px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          transition: background-color 0.5s ease;
        }
        .button:hover {
          color: #fff;
          background-color: #9795a0;
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

        .centered {
          margin: 0 auto;
        }

        .footerContainer {
          margin: 50px 0 50px 0;
          display: block;
          width: 100%;
        }

        .post__karma {
          font-family: 'PT Serif';
          font-size: 14px;
          width: 30px;
          height: 80px;
          padding-top: 8px;
          margin-right: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          transition: color 0.5s ease;
        }
        .post__karma > * {
          flex: 1;
        }
        .post__vote {
          cursor: pointer;
          text-decoration: none;
        }
        .post__vote:hover {
          color: #999;
        }
        .happy {
          color: #00ba3e;
        }
        .happy:hover {
          color: #00ba3e;
        }
        .sad {
          color: #ff0000;
        }
        .sad:hover {
          color: #ff0000;
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
