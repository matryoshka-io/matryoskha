
import Page from '../components/Page';
import Posts from '../components/Posts';
import UserPanelBody from '../components/UserPanelBody';

import Data from '../../server/database/dataFrontEnd.json';
import auth from '../utils/auth';
import sessions from '../utils/sessions';


const Homepage = props => (
  <Page>
    <div className="pageContent">
      <div className="posts" >
        <Posts myPosts={props.posts} />
      </div>
      <div className="login" >
        <UserPanelBody user={props.user} />
      </div>
    </div>
    <style jsx>
      {`
        .pageContent {
          width: 100%;
        }
        h1 {
          font-size: 36px;
          color: #333;
          align-text: center;
        }
        h2 {
          margin-left: 16px;
        }
        .posts {
          border: solid 2px;
          float: left;
          width: 75%;
        }
        .login {
          border: solid 2px;
          float: right;
          width: 22%;
          height: 80%;
        } * {
          border:1
        }
      `}
    </style>
  </Page>
);

Homepage.getInitialProps = async function GetInitialPropsForHomepage(context) {
  const token = sessions.getToken('jwt', context.req);
  const tokenData = await auth.authenticateToken(token);
  return {
    user: tokenData.user || null,
    token,
    posts: Data,
  };
};

export default Homepage;
