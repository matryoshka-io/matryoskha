import Link from 'next/link';

export default ({ title, subreddit }) => {
  if (subreddit) {
    return (
      <ul>
        <Item href={`/r/${subreddit}/`}>{`/r/${subreddit}`}</Item>
        <Item href="/">best</Item>
        <Item href="/">new</Item>

        <style jsx>
          {`
          ul {
            list-style-type: none;
            background: #696775;
            margin: 4px;
            padding: 0;
          }
        `}
        </style>
      </ul>
    );
  }
  return (
    <ul>
      <Item href="/">best</Item>
      <Item href="/new">new</Item>

      <style jsx>
        {`
          ul {
            list-style-type: none;
            background: #696775;
            margin: 4px;
            padding: 0;
          }
        `}
      </style>
    </ul>
  );
};

const Item = ({ href, children }) => (
  <li>
    <Link prefetch href={href}>
      <a>{ children }</a>
    </Link>

    <style jsx>
      {`
      li {
        display: inline-block;
      }
      a {
        display: inline-block;
        padding: 10px;
        margin-right: 10px;
        font-size: 16px;
        text-transform: uppercase;
        text-decoration: none;
        color: #f4ebce;
      }
      a:hover {
        color: #fff;
        text-decoration: none;
      }

      `}
    </style>
  </li>
);
