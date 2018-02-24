import Link from 'next/link'

export default () => (
    <div className="vote">
    <div className="arrowUp"><Link href="#"><a>&#x25B2;</a></Link></div>
<div className="upvotesCount">10.5k </div>
<Link href="#"><a>&#x25BC;</a></Link>
   <style jsx>{`
    .arrowUp {
        align-content: center,
    }
    .vote {
        margin-left: 10px
    }
   `}</style>
    </div>
)