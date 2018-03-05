import Nav from './Nav';
import Footer from './Footer';

export default ({ title, children }) => (
  <div className="main">
    <div>
      <div className="mat">
        <img src="/static/mat.png" height={80} />
      </div>
      <Nav />
    </div>
    <div className="page">
      {children}
    </div>
    <div className="footerContainer">
      <Footer />
    </div>
    <style jsx global>
      {`

        body {
          margin: 0px;
          background: url('/static/background.png') top center no-repeat;
          background-size: cover;
          min-height: 100vh;
        }
        .page {
          padding: 6px;
        }
      `}
    </style>
    <style jsx>
      {`
      .footerContainer {
        margin: 50px 0 50px 0;
        display: flex;
        align-content: end;
        flex-direction: column;
      }
        .mat {
          text-align: center;
        }
        .main {
          width: 95%;
          margin: auto;
          padding: 10px 0 0 0;
        }
        .page {
          padding: 3px 10px;
          display: flex;
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
