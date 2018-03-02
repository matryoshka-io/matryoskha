const SubredditPanelBody = ({ user, subreddit, subscribe }) => {
  if (subreddit) {
    return (
      <div className="body__panel">
        <h3>{`/r/${subreddit}`}</h3>
        <button className="button primary" >Subscribe</button>
        <style jsx>
          {`
            h3 {
              text-align: center
            }
            .body__panel {
              height: 200px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
            }
            .button {
              margin: 4px;
              border: solid 1px #333;
              width: 85%;
              height: 20px;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
            }
            .button:hover {
              cursor: pointer;
            }
            .primary {

            }
            .secondary {
            }
          `}
        </style>
      </div>
    );
  }
  return (<div />);
};

export default SubredditPanelBody;
