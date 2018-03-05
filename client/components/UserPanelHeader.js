import Link from 'next/link';
import LoginForm from './LoginForm';

// todo: separate into frontpage, subreddit varieties for logged-in
const UserPanelHeader = ({ user, karma, subscriptions, logout }) => {
  if (user && user.username) {
    return (
      <div className="user__header">
        <h3><Link href={`/u/${user.username}`}><a>{user.username}</a></Link></h3>
        <div className="user__karma">
          {`[ ${karma} ]`}
        </div>
        <div className="user__subreddit-menu">
        </div>
        <a className="user__logout" onClick={logout}>Logout</a>
        <style jsx>
          {`
            .user__header {
              align-self: flex-end;
              width: 400px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-end;
            }
            .user__header > * {
              line-height: 36px;
              margin-left: 8px;
            }
            .user__karma {
              font-size: 14px;
              font-weight: 700;
            }
            .user__logout:hover {
              cursor: pointer;
            }
          `}
        </style>
      </div>
    );
  }
  return <div />;
};

export default UserPanelHeader;
