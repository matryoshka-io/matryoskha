import Router from 'next/router';

import PostForm from '../components/PostForm';
import Page from '../components/Page';

import routing from '../utils/redirect';
import utils from '../utils';

const CreatePostPage = ({ subreddit, user, karma, subscriptions }) => (
  <div>
    <Page
      subreddit={subreddit}
      user={user}
      karma={karma}
      subscriptions={subscriptions}
    >
      <div className="centered">
        <PostForm subreddit={subreddit} user={user} />
      </div>
    </Page>
  </div>
);

CreatePostPage.getInitialProps = async function GetInitialPostData(context) {
  const session = await utils.auth.initializeSession(context);
  const profile = await utils.data.prepUserProfile(session);
  if (!session.user) {
    // todo: add referrer to login redirects
    Router.replace('/login');
  }
  return {
    subreddit: context.query.sub,
    user: session.user,
    karma: profile.karma,
    subscriptions: profile.subscriptions,
  };
};

export default CreatePostPage;
