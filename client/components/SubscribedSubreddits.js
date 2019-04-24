const SubscribedSubreddits = ({ subscriptions }) => {
  return (
    <div class="dropdown">
      <button class="dropdown-button">My Subreddits</button>
      <div class="dropdown-links">
        {subscriptions.map(sub => <a href={`/r/${sub.subreddit.titleSlug}`}>{sub.subreddit.title}</a>)}
      </div>
      <style>{`
    .dropdown-button {
      background-color: transparent;
      color: #696775;
      font-size: 12px;
      font-family: 'PT Mono';
      font-weight: bold;
      text-transform: uppercase;
      border: none;
    }
    .dropdown {
      position: relative;
      display: inline-block;
    }
    .dropdown-links {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }
    .dropdown-links a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .dropdown-links a:hover {background-color: #696775}

    .dropdown:hover .dropdown-links {
      display: block;
    }

    .dropdown:hover .dropdown-button {
      font-color: white;
    }
    `}</style>
    </div>
  )
}

export default SubscribedSubreddits;