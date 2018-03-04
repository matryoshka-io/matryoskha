import Router from 'next/router';

import PostForm from '../components/PostForm';
import Page from '../components/Page';

import routing from '../utils/redirect';
import auth from '../utils/auth';

const CreatePostPage = ({ subreddit, user }) => (
  <div>
    <Page title="Create New Post">
      <PostForm subreddit={subreddit} user={user} />
    </Page>
  </div>
);

CreatePostPage.getInitialProps = async function GetInitialPostData(context) {
  const session = await auth.initializeSession(context);
  if (!session.user) {
    routing.redirect('/login', context); // TODO: add referrer link for rerouting post-login
  }
  return {
    subreddit: context.query.sub,
    user: session.user,
  };
};

export default CreatePostPage;
