const Index = (props) => (
  <div>
    <h1>Matryoshka Stack +1</h1>
    <h2>{props.message}</h2>
    <style jsx>
    {`
      h1 { font-size: 36px; color: #333;}
      h2 { margin-left: 16px; }
    `}
    </style>
  </div>
);

Index.getInitialProps = async function () {
  // initial data requests happen in here
  // they are passed to props above automatically
  return {
    message: "There are many dolls, but this one is ours"
  }
};

export default Index;