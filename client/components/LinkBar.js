import Img from 'react-image';
import axios from 'axios';

class LinkBar extends React.Component {
  constructor (props) {
    super (props)
    this.state= {
      titleText: '', 
      subredditName: this.props.subreddit,
      imageLink: '',
    }
    this.createNewImagePost = this.createNewImagePost.bind(this)
  }

  createNewImagePost(e) {
    this.setState({
      imageLink: e.target.value
    })
  }
  
  render () {
    return (
      <div>
        Video and Img Link: <br />
        <input val="text" onChange={this.createNewImagePost}/> <br />
        <button onClick={this.imageHandle} >Upload</button>
        <div className="imagePreview">
          <Img src={this.state.imageLink} width={250} />
        </div>
        <style jsx>
          {`
            
            
          `}
        </style>
      </div>
    )
  }


}

export default LinkBar;
