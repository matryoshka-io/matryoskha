import axios from 'axios';
import LinkBar from './LinkBar';
import TextBox from './TextBox'
import SubredditNameBox from './SubredditNameBox';
import exampleData from '../../server/database/data.json'
import auth from '../utils/auth';
import sessions from '../utils/sessions'

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      isTextBoxHidden: false,
      isLinkBarHidden: true,
      selectedType: '',
      type: 'Text',
      subredditName: '',
      subredditText: '',
      bodyText: '',
    };
  }

  onSubredditTextChangeHandler = (e) => {
    this.setState({ subredditText: e.target.value }, () => {
      console.log('in main form page', this.state.subredditText)
    });
  }

  onTitleTextChangeHandler = (e) => {
    this.setState({
      titleText: e.target.value
    });
  }

  //text posts can't have links & link posts can't have texts
  // James: why isn't this a multi-way else-if?
  onDropdownChangeHandler = (e) => {
    if (e.target.value === 'text') {
      this.setState({
        type: 'text',
        isTextBoxHidden: false,
        isLinkBarHidden: true
      });
    } else if (e.target.value === 'image') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        type: 'image'
      });
    } else if (e.target.value === 'video') {
      this.setState({
        isLinkBarHidden: false,
        isTextBoxHidden: true,
        type: 'video'
      });
    }
  }

  onBodyTextChangeHandler = (e) => {
    this.setState({ bodyText: e.target.value }, () => {
      console.log(this.state.bodyText)
    })
  }

  onCreateNewTextPostWithUserText = () => {
    this.createNewTextPost(this.state.titleText, this.state.type, this.state.bodyText)
  }

  createNewTextPost = (titleText, type, bodyText, url) => {
    const token = sessions.getToken('jwt');
    axios.get('/api', auth.makeTokenHeader(token))
      .then((res) => {
        console.log('ressss', res)
        const responseArr = JSON.parse(res.request.response)
        responseArr.forEach((responseData) => {
          console.log('responseData', responseData)
          const subredditTitle = responseData.subreddit.title;
          if (subredditTitle === this.state.subredditText) {
            return this.setState({ subredditName: subredditTitle })
          }
          console.log('No such subreddit exists.');
        });
      })
      .then((res) => {
        axios.post(`/api/sub/${this.state.subredditName}`, { title: titleText, type: this.state.type, body: bodyText })
      })
      .then((res) => {
        console.log('successful post')
      });
    //work on links later
  }

  render() {
    return (
      <div className="postSubmission">
        <h3>Submit a post</h3>

        <div id="subredditNameBox">
          Your subreddit:
          <SubredditNameBox onSubredditTextChangeHandler={this.onSubredditTextChangeHandler} />
        </div>

        Title: <br />
        <textarea rows="1" cols="80" value={this.state.titleText} onChange={this.onTitleTextChangeHandler}>
        </textarea> <br />

        Type:
        <select id="typeDropdown" onChange={this.onDropdownChangeHandler} >
          <option value="text" >Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <br />

        <div id="linkBar">
          {this.state.isLinkBarHidden ? null : <LinkBar />}
        </div>

        <div id="textbox">
          {this.state.isTextBoxHidden ? null : <TextBox onBodyTextChangeHandler={this.onBodyTextChangeHandler} />}
        </div>

        <button onClick={this.onCreateNewTextPostWithUserText}>Post!</button>
      </div>
    );
  }
}

export default PostForm;

