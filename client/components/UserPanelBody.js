import LoginForm from './LoginForm';

const UserPanelBody = (props) => {
  if (props.user && props.user.username) {
    return (
      <div>
        <h3>Welcome, {`/u/${props.user.username}`}</h3>
        <button onClick={console.log('item clicked around!!!!!')}>Logout</button>
      </div>
    );
  }
  return <LoginForm login={props.login} />;
};

export default UserPanelBody;
