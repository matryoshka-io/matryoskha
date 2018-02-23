import Link from 'next/link'
import SubRedditBar from './subbredditBar'
import Rating from './rating'

export default ({author, subreddit, title, body, date, comments}) => (
  
  <div style={{'border': 'solid', 'margin' : '10px', 'padding': '10px'}}>
    {console.log(author)}
     <Link href={subreddit}><a>{subreddit.title}</a></Link>
     <span style={{'float': 'right'}}>created at: {subreddit.date}</span>
     <div>desc: {subreddit.description}</div>
     <Rating />
     <div>
       <SubRedditBar className="subbredditbar"/>
     </div>
     <style jsx>{`
       .subbredditbar {
         float: left
       }
     `}
     </style>
   </div>

)








// const Post = () => (
//     <div>

//     <Link href="#"><a><h3>motherfuck</h3></a></Link>
//       <div>
//         <h5>submited: 3hr ago</h5>
//         <ul>
//             <Item href="#">comments</Item>
//             <Item href="#">share</Item> 
//             <Item href="#">save</Item>
//             <Item href="#">hide</Item>   
//         </ul>
//       </div>
//       <style jsx>{
//         `ul {
//             list-style-type: none;
//         }`
//       }</style>
//     </div>
// )

// const Item = (props) => (
//     <li>
//       <Link >
//         <a>{props.post.title}</a>
//       </Link>
  
//       <style jsx>{`
//         li {
//           display: inline-block;
//         }
//         a {
//           display: inline-block;
//           padding: 5px;
//           margin-right: 5px;
//           font-size: 10px;
//           text-transform: uppercase;
//           text-decoration: none;
//           color: #000;
//         }
//         a:hover {
//           color: #fff;
//         }
//       `}</style>
//     </li>
// )

// export default Post