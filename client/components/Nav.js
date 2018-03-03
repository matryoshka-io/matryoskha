import Link from 'next/link'
import Logo from './Logo'

export default () => (
  <ul>
    
    <a href="/"><Logo/></a>
    <Item href="/best">best</Item>
    <Item href="/hot">hot</Item>
    <Item href="/new">new</Item>
    <Item href="/rising">rising</Item>
    <Item href="/top">top</Item>

    <style jsx>
      {`
        ul {
          list-style-type: none;
          background: #696775;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
  </ul>
);

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
        }
        
      `}
    </style>
  </li>
);
