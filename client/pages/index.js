
const Homepage = props => (
  <div>
    <h1>{props.url.asPath}</h1>
    <h2>You are everywhere and nowhere all at once</h2>
    <style jsx>
      {`
        h1 {
          font-size: 36px;
          color: #333;
        }
        h2 {
          margin-left: 16px;
        }
      `}
    </style>
  </div>
);

Homepage.getInitialProps = async function () {
  // initial data requests happen in here
  // they are passed to props above automatically
  return {
    navigation: {},
    user: {},
    posts: {},
  }
};

export default Homepage;