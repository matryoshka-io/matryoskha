import Nav from '../components/nav'
import Posts from '../components/posts'
import Data from '../../server/database/data.json'

const Homepage = props => (
    <div>
      {/* <h1>{props.url.asPath}</h1> */}
      <h2>Welcome to Matryoshka Io</h2>
      <Nav />
      <h2>You are everywhere and nowhere all at once</h2>
      <Posts myPosts={props.posts} />
      
      <style jsx>
        {`
          h1 {
            font-size: 36px;
            color: #333;
            align-text: center;
          }
          h2 {
            margin-left: 16px;
          }
        `}
      </style>
    
    </div>
  );
  
  Homepage.getInitialProps = async function () {
    // initial data requests happen in here
    // they are passed to props above automatically
    // let ourPosts = await res.json()
    console.log(Data)
    return {
      user: {},
      posts: Data
    }
  };
  
  export default Homepage;








// class Page extends React.Component {
//     static async getInitialProps(args) {
//       let ourPosts = await res.json() // supposedly an array of objects, an object will be individual Post
//       post = {
//           Title: String,
//           UserId: Number, //the userId associated with it 
//           Body: String, //or the content of the subReddit Link and Image will be part of it
//           Votes: Number, //the ranking will be based on the number of votes from the users
//           Date: Date, // the date the subReddit was created
//           Comments: Obj // comments object might be the heaviest commponent in terms of data
//           //it will include all the comments or all nested nodes of content

//       }
//         return {
//             jsonData: post
//         }
//     }
  
//     render() {
//       return (
//           <Page>
//               <Nav />
//               <Posts />
//           </Page>
//       )
//     }
//   }