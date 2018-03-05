import Router from 'next/router';
import axios from 'axios';
import LinkBar from './LinkBar';
import TextBox from './TextBox';
import SubredditNameBox from './SubredditNameBox';
// import exampleData from '../../server/database/data.json';
import auth from '../utils/auth';
import sessions from '../utils/sessions';
import routing from '../utils/redirect';
// import slugify from 'slugify';
import Img from 'react-image';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      isTextBoxHidden: false,
      isLinkBarHidden: true,
      type: 'Text',
      subredditName: this.props.subreddit,
      bodyText: '',
      link: '',
    };
    this.onDropdownChangeHandler = this.onDropdownChangeHandler.bind(this);
    this.onTitleTextChangeHandler = this.onTitleTextChangeHandler.bind(this);
    this.onBodyTextChangeHandler = this.onBodyTextChangeHandler.bind(this);
    this.onCreateNewTextPostWithUserText = this.onCreateNewTextPostWithUserText.bind(this);
    this.onLinkChangeHandler = this.onLinkChangeHandler.bind(this);
  }

  onTitleTextChangeHandler(e) {
    this.setState({
      titleText: e.target.value,
    });
  }
  
  onDropdownChangeHandler(e) {
    if (e.target.value === 'text') {
      this.setState({
        type: 'Text',
        isTextBoxHidden: false,
        isLinkBarHidden: true,
        isTitleHidden: false,
      });
    } else if (e.target.value === 'image') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        isTitleHidden: false,
        type: 'Image',
      });
    } else if (e.target.value === 'video') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        isTitleHidden: false,
        type: 'Video',
      });
    } else if (e.target.value === 'article') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        isTitleHidden: true,
        type: 'Article',
      })
    }
  }

  onBodyTextChangeHandler(e) {
    this.setState({ bodyText: e.target.value })
  }

  onLinkChangeHandler(e) {
    this.setState({ link: e.target.value })
  }

  onCreateNewTextPostWithUserText() {
    this.createNewTextPost(this.state.titleText, this.state.type, this.state.bodyText, this.state.imageLink);
  }

  // onCreateNewPostWithUserImage() {
  //   this.createNewImagePost(this.state.titleText, this.state.type, this.state.imageLink, this.state.imageLink);
  // }

  // createNewImagePost(titleText, type, url ) {
  //   const token = sessions.getToken('jwt');
  //   axios.post(
  //     `/api/sub/${this.state.subredditName}`,
  //     { title: titleText, type: this.state.type, subreddit: this.state.subredditName, url: this.state.imageLink },
  //     auth.makeTokenHeader(token),
  //   )
  //     .then((res) => {
  //       Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
  //     })
  //     .catch(err => console.log(err));
  // }

  createNewTextPost(titleText, type, bodyText, url) {
 
     if (type === 'Text') {
      const token = sessions.getToken('jwt');
      axios.post(
        `/api/sub/${this.state.subredditName}`,
        { title: this.state.titleText, type: 'Text', body: this.state.bodyText, subreddit: this.state.subredditName },
        auth.makeTokenHeader(token),
      )
        .then((res) => {
          Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
        })
        .catch(err => console.log(err));
      } else if (type === 'Article') {
        const token = sessions.getToken('jwt');
        axios.post(
          `/api/sub/${this.state.subredditName}`,
          { type: 'Article', url: this.state.link },
          auth.makeTokenHeader(token),
        )
          .then((res) => {
            Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
          })
          .catch(err => console.log(err));        
      } else if (type === 'Image') {
        const token = sessions.getToken('jwt');
        axios.post(
          `/api/sub/${this.state.subredditName}`,
          { title: this.state.titleText, type: 'Image', url: this.state.link },
          auth.makeTokenHeader(token),
        )
          .then((res) => {
            Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
          })
          .catch(err => console.log(err));        
      }


    // work on links later
  }

  render() {
    return (
      <div className="postSubmission">
        <h3>Submit a post to {`/r/${this.state.subredditName}`}</h3>

        Type:
        <select id="typeDropdown" onChange={this.onDropdownChangeHandler} >
          <option value="text" >Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value='article'>Article</option>
        </select>

        <br />

        {this.state.isTitleHidden ? null :
          <div>
            Title:
            <br />
            <textarea rows="1" cols="80" value={this.state.titleText} onChange={this.onTitleTextChangeHandler} />
            <br />
          </div>
        }

        <div id="linkbar">
          {this.state.isLinkBarHidden ? null : <LinkBar linkChange={this.onLinkChangeHandler} />}
        </div>

        <div id="textbox">
          {this.state.isTextBoxHidden ? null : <TextBox onBodyTextChangeHandler={this.onBodyTextChangeHandler} />}
        </div>

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
        <style jsx>
        {`
          .postSubmission {
            text-align: center;
          }
        `}
        </style>
      </div>
    );
  }
}

export default PostForm;

