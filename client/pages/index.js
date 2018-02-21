import PostForm from './PostForm.jsx'
import axios from 'axios'
// const Index = (props) => (
// <div>
//   <h1>Matryoshka Stack +1</h1>
//   <h2>{props.message}</h2>
//   <style jsx>
//     {`
//     h1 { font-size: 36px; color: #333;}
//     h2 { margin-left: 16px; }
//   `}
//   </style>
// </div>
// );

// Index.getInitialProps = async function () {
//   // initial data requests happen in here
//   // they are passed to props above automatically
//   return {
//     message: "There are many dolls, but this one is ours"
//   }
// };

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "There are many dolls, but this one is ours"
    }
  }

  createNewPost = (titleText, type, bodyText) => {
    axios.post('/user/:id/posts', { title: titleText, body: bodyText }) //add type here!!
  }

  render() {
    return (
      <div>
        <h1>Matryoshka Stack +1</h1>
        <h2>{this.state.message}</h2>
        <style jsx>
          {`
        h1 { font-size: 36px; color: #333;}
        h2 { margin-left: 16px; }
      `}
        </style>

        <PostForm />
        {/* ^ render that on profile post pages! */}
      </div>
    )
  }
}

export default Index;