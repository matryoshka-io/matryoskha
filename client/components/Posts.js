import Post from './Post';

export default ({ posts, vote }) => {
  if (posts.length) {
    return (
      <div >
        { posts.map((post, i) => <Post key={i} {...post} castVote={vote} />) }
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
  }
  return (
    <div>
      <h3>{'It\'s awfully quiet in here!'}</h3>
    </div>
  );
};
