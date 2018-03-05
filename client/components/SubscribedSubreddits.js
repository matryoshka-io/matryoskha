import Dropdown from 'react-simple-dropdown'
import DropdownTrigger from 'react-simple-dropdown/lib/components/DropdownTrigger';
import DropdownContent from 'react-simple-dropdown/lib/components/DropdownContent'
import Link from 'next/link';

const SubscribedSubreddits = ({ subscriptions }) => {
  return (
    //   <div>
    //     <div class="wrapper">
    //       <ul class="mySubreddits">
    //         {subscriptions.map(sub => <li><Link href={`/r/${sub.subreddit.titleSlug}`}>{sub.subreddit.title}</Link></li>)}
    //       </ul>
    //     </div>
    //     <style>{`
    //   // .mySubreddits li {
    //   //   float: left;
    //   //   margin-right: 10px;
    //   //   position: relative;
    //   // }
    //   // .mySubreddits ul {
    //   //   list-style: none;
    //   //   position: absolute;

    //   // }
    // `}</style>
    //   </div>
    <div class="dropdown">
      <button class="dropdown-button">My Subreddits</button>
      <div class="dropdown-links">
        {subscriptions.map(sub => <a href={`/r/${sub.subreddit.titleSlug}`}>{sub.subreddit.title}</a>)}
      </div>
      <style>{`
    .dropdown-button {
      background-color: #696775;
      color: white;
      padding: 10px;
      font-size: 10px;
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
  background-color: #696775;
  font-color: white;
}
    `}</style>
    </div>



  )
}

export default SubscribedSubreddits;