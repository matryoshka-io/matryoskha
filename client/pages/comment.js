const Comment = (props) => (
  <div>
    <h1>{props.url.asPath}</h1>
  </div>
);

Comment.getInitialProps = async function () {

  return {
    navigation: {},
    user: {},
    parent: {},       // parent post content
    content: {},      // comment content
    comments: {},     // children of comment
  }
};

export default Comment;
