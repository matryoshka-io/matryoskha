import Post from './Post';

export default props => (

  <div >
    { props.myPosts.map((post, i) => <Post key={i} {...post} />) }
    <style jsx>
      {`
        .item {
          padding: 10px 29px;
        }
        .form {
          padding: 15px 0;
        }
        .loading {
          font-size: 13px;
        }
        .comments {
          padding: 10px 0 20px;
        }
        @media (max-width: 750px) {
          .item {
            padding: 8px 0px;
          }
        }
      `}
    </style>
  </div>
);
