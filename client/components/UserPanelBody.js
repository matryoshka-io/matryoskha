import Link from 'next/link';
import LoginForm from './LoginForm';

// todo: separate into frontpage, subreddit varieties for logged-in
const UserPanelBody = ({ user, login, logout }) => {
  if (!user) {
    return <LoginForm login={login} />;
  }
  return <div />;
};

export default UserPanelBody;
