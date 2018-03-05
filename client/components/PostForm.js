import Img from 'react-image';
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
import { BASE_URL } from '../../app.config';

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
        isTitleHidden: true,
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

  createNewTextPost(titleText, type, bodyText, url) {
    console.log(...arguments);
     if (type === 'Text') {
      const token = sessions.getToken('jwt');
      axios.post(
        `${BASE_URL}/api/sub/${this.state.subredditName}`,
        { title: titleText, type: this.state.type, body: this.state.bodyText, subreddit: this.state.subredditName },
        auth.makeTokenHeader(token),
      )
        .then((res) => {
          Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
        })
        .catch(err => console.log(err));
      } else if (type === 'Article') {
        const token = sessions.getToken('jwt');
        axios.post(
          `${BASE_URL}/api/sub/${this.state.subredditName}`,
          { type: 'Article', url: this.state.link },
          auth.makeTokenHeader(token),
        )
          .then((res) => {
            Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
          })
          .catch(err => console.log(err));
      }  else if (type === 'Image') {
        const token = sessions.getToken('jwt');
        axios.post(
          `${BASE_URL}/api/sub/${this.state.subredditName}`,
          { title: titleText, type: 'Image', url: this.state.link },
          .catch(err => console.log(err));        
      } else if (type === 'Video') {
        const token = sessions.getToken('jwt');
        axios.post(
          `/api/sub/${this.state.subredditName}`,
          { type: 'Video', url: this.state.link },
          auth.makeTokenHeader(token),
        )
          .then((res) => {
            Router.replace(`/r/${this.state.subredditName}/${res.data._id}/${res.data.titleSlug}`);
          })
          .catch(err => console.log(err));
      }
  }

  render() {
    return (
      <div className="postSubmission centered">
        <h3>Submit a post to {`/r/${this.state.subredditName}`}</h3>

        <select id="typeDropdown" onChange={this.onDropdownChangeHandler} >
          <option value="text" >Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value='article'>Article</option>
        </select>

        {this.state.isTitleHidden ? null :
          <input value={this.state.titleText} onChange={this.onTitleTextChangeHandler} placeholder="title" />
        }

        <div id="linkbar">
          {this.state.isLinkBarHidden ? null : <LinkBar linkChange={this.onLinkChangeHandler} />}
        </div>

        <div id="textbox">
          {this.state.isTextBoxHidden ? null : <TextBox bodyText={this.state.bodyText} onBodyTextChangeHandler={this.onBodyTextChangeHandler} />}
        </div>

        <button className="button wider" onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
        <style jsx>
          {`
            .postSubmission {
              width: 500px;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
            }
            .postSubmission > * {
              flex: 1;
              margin: 4px;
            }
            input {
              width: 95%;
            }
            select {
              width: 95%;
            }
            .wider {
              width: 50%;
            }
          `}
        </style>
      </div>
    );
  }
}

export default PostForm;

