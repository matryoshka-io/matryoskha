
import Page from '../components/Page';
import Posts from '../components/posts';
import LoginForm from '../components/LoginForm';

import Data from '../../server/database/dataFrontEnd.json';


const Homepage = props => (
  <Page>
    <div className="pageContent">
      <div className="posts" >
        <p>This is left panel for posts</p>
        <Posts myPosts={props.posts}/>
      </div>
      <div className="login" >
        <LoginForm />
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

Homepage.getInitialProps = async function GetInitialPropsForHomepage() {
  return {
    user: {},
    posts: Data,
  };
};

export default Homepage;
