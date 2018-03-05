import Link from 'next/link';
import LoginForm from './LoginForm';

// todo: separate into frontpage, subreddit varieties for logged-in
const UserPanelBody = ({ user, login, logout }) => {
  if (user && user.username) {
    return (
      <div className="user__panel">
        <h2><Link href="/user/profile"><a>{user.username}</a></Link></h2>
        <button className="button primary" onClick={logout} >Logout</button>
        <style jsx>
          {`
            h3 {
              text-align: center
            }
            .user__panel {
              height: 200px;
              background: #696775;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
            }
            .button {
              margin: 4px;
              border: solid 1px #333;
              width: 85%;
              height: 20px;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
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
  return <LoginForm login={login} />;
};

export default UserPanelBody;
