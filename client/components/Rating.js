import Link from 'next/link';

// vote method
// voted state from response on logged in user


export default ({ karma }) => (
  <div className="post__karma">
    <div className="arrowUp"><Link href="#"><a>&#x25B2;</a></Link></div>
    <div className="upvotesCount">{karma}</div>
    <Link href="#"><a>&#x25BC;</a></Link>
    <style jsx>
      {`
        .arrowUp {
            align-content: center,
        }
        .vote {
            margin-left: 10px
        }
      `}
    </style>
  </div>
);
