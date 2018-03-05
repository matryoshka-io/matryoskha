import Link from 'next/link';

const SubredditPanelBody = ({ subscribed, subreddit, subscribe }) => {
  if (subreddit) {
    return (
      <div className="body__panel">
        <h3>{`/r/${subreddit}`}</h3>
        <Link href={`/create/${subreddit}/`} ><button className="button primary" >Create Post</button></Link>
        <button className="button primary" onClick={subscribe}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
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
              width: 95%;
            }
          `}
        </style>
      </div>
    );
  }
  return (<div />);
};

export default SubredditPanelBody;
