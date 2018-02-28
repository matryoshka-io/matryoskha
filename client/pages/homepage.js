import Nav from '../components/nav'
import Posts from '../components/posts'
import LoginForm from '../components/loginForm'
import Footer from '../components/footer'
import Data from '../../server/database/dataFrontEnd.json'


const Homepage = props => (
    <div >
      {/* <h1>{props.url.asPath}</h1> */}
      <h2>Welcome to Matryoshka Io</h2>
      <Nav />
      <div className="pageContent">                        
        <div className="posts" > 
          <h2>This is left panel for posts</h2> 
          <Posts myPosts={props.posts}/>
        </div>                     
      <div className="login" > 
        <LoginForm />
        <div className="createPostDiv">
          <button className="createPost">Create Post</button>
        </div>  
      </div>   
      <div className="footer">
        <Footer />
      </div>
      </div>
      <style jsx>
        {`

         
          .pageContent {
            width: 100%;
          }
          h1 {
            font-size: 36px;
            color: #333;
            align-text: center;
          } 
          h2 {
            text-align: center;
          }
          .posts {
            border: solid 2px;
            float: left;
            width: 75%;
          }
          .login {
            border: solid 2px;
            float: right;
            width: 22%;
            height: 80%;
          }
          .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
          }
          .createPostDiv {
            width: 100px
            padding: 20px 50px;
          }
          .createPost { 
            width: 250px
            height: 15px
          }
        `}
      </style>
     
    </div>
  );
  
  Homepage.getInitialProps = async function () {
    // initial data requests happen in here
    // they are passed to props above automatically
    // let ourPosts = await res.json()
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