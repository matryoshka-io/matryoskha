import Homepage from './homepage'
export default Homepage

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
