import Link from 'next/link';
import LoginForm from './LoginForm';

// todo: separate into frontpage, subreddit varieties for logged-in
const UserPanelHeader = ({ user, subscriptions, logout }) => {
  if (user && user.username) {
    return (
      <div className="user__header">
        <h3><Link href="/user/profile"><a>{user.username}</a></Link></h3>
        <div className="user__karma">
          {user.karma}
        </div>
        <div className="user__subreddit-menu">
          <ul>
            <li>My Subreddits</li>
            {subscriptions.map(sub => <li><Link href={`/r/${sub.titleSlug}`}>{sub.title}</Link></li>)}
          </ul>
        </div>
        <button className="button primary" onClick={logout} >Logout</button>
        <style jsx>
          {`
            .user__header {
              float: right;
              width: 400px;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
            }

          `}
        </style>
      </div>
    );
  }
  return <div />;
};

export default UserPanelHeader;
