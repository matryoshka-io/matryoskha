import LoginForm from './LoginForm';

// todo: separate into frontpage, subreddit varieties for logged-in
const UserPanelBody = ({ user, login, logout, subscribe }) => {
  if (user && user.username) {
    return (
      <div className="user__panel">
        <h3><a href="/user/profile">{user.username}</a></h3>
        <button className="button primary" >Create Post</button>
        <button className="button primary" >Submit Article</button>
        <button className="button primary" >Submit Image</button>
        <style jsx>
          {`
            h3 {
              text-align: center
            }
            .user__panel {
              height: 200px;
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
