

const Profile = (props) => (
  <div>
    <h1>{props.url.asPath}</h1>
    <p>{JSON.stringify(props)}</p>
    <style jsx>
    {`
      h1 {color: blue;}
    `}
    </style>
  </div>
);

Profile.getInitialProps = async function() {
  return {
    test: 'where dis'
  };
};

export default Profile;