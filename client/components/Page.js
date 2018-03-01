import Nav from './Nav';
import Footer from './Footer';



export default ({ title, children }) => (
  <div className="main">
    <h2>{ title }</h2>
    <Nav />
    <div className="page">
      { children }
    </div>
    <Footer />
    <style jsx>
      {`
        .main {
          width: 85%;
          margin: auto;
          padding: 10px 0 0 0;
        }
        .page {
          color: #828282;
          background: #fff;
          padding: 3px 10px;
        }
        @media (max-width: 750px) {
          .main {
            padding: 0;
            width: auto;
          }
        }
      `}
    </style>
  </div>
);
