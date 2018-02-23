import Link from 'next/link'

export default () => (
  <ul>
    <Item href="/comments">comments</Item>
    <Item href="/share">share</Item>
    <Item href="/save">save</Item>
    <Item href="/hide">hide</Item>
    <Item href="/report">report</Item>

    <style jsx>{`
      ul {
        list-style-type: none;
      }
    `}</style>
  </ul>
)

const Item = ({ href, children }) => (
  <li>
    <Link prefetch href={href}>
      <a>{ children }</a>
    </Link>

    <style jsx>{`
      li {
        display: inline-block;
      }
      a {
        display: inline-block;
        padding: 5px;
        font-size: 11px;
        text-transform: uppercase;
        text-decoration: none;
        color: #000;
      }
      a:hover {
        color: #fff;
      }
    `}</style>
  </li>
)
