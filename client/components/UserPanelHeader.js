import Link from 'next/link';
import LoginForm from './LoginForm';
import SubscribedSubreddits from './SubscribedSubreddits';

// todo: separate into frontpage, subreddit varieties for logged-in
const UserPanelHeader = ({ user, karma, subscriptions, logout }) => {
  if (user && user.username) {
    return (
      <div className="user__header">
        <h3><Link href="/user/profile"><a>{user.username}</a></Link></h3>
        <div className="user__karma">
          {karma}
        </div>
        <div className="user__subreddit-menu">
          <SubscribedSubreddits subscriptions={subscriptions} />
        </div>
        <a onClick={logout} >Logout</a>
        <style jsx>
          {`
            .user__header {
              align-self: flex-end;
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
