import Link from 'next/link'

export default () => (
  <div>
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
  </div>
)

const Item = ({ href, children }) => (
  <div>
    <Link prefetch href={href}>
      <a>{ children }</a>
    </Link>

    <style jsx>{`
      div {
        display: inline-block;
      }
      a {
        display: inline-block;
        padding: 3px;
        font-size: 11px;
        text-transform: uppercase;
        text-decoration: none;
        color: #000;
      }
      a:hover {
        color: #fff;
      }
    `}</style>
  </div>
)
