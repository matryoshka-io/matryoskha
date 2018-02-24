import LoginForm from './LoginForm';

const UserPanelBody = (props) => {
  if (props.user && props.user.username) {
    return (
      <div>
        <h3>Welcome, {`/u/${props.user.username}`}</h3>
        <button>Logout</button>
      </div>
    );
  }
  return <LoginForm />;
};

export default UserPanelBody;
