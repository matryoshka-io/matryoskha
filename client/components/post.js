import Link from 'next/link'
import PostDetails from './postDetails'
import Rating from './rating'

export default ({_id, author, subreddit, title}) => (
<div>
  <div className="subbredditContent">
     <div className="rankingDiv">1</div>
     <div id="ratingDiv"><Rating /></div>
     <div id="imageDiv"><img src="http://lorempixel.com/400/200" style={{"width" : "70px","height": "70px"}}></img></div>
     <div><PostDetails subreddit={subreddit} title={title} author={author}/></div>
     <style jsx>{`
        #titleDiv, #dateDiv, #ratingDiv, #imageDiv {
         padding-right: 10px
       }
       .rankingDiv {
         padding-right: 15px
       }
       div {
         display: inline-block
       }
       .subbredditContent {
       }
       .subbredditbar {
         float: left
       }
       #imageDiv {
        width: 70px,
        height: 70px
       }
     `}
     </style>
   </div>
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