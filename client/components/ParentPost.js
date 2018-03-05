import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Link from 'next/link';
import auth from '../utils/auth';
import sessions from '../utils/sessions';
import frontpage from '../pages/frontpage'
import Img from 'react-image'

class ParentPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditId: props.subreddit,
      postId: props._id,
      commentBody: '',
      postTitle: props.title,
      postBodyText: props.body,
      comments: props.comments,
      url: props.url,
      thumbnail: props.thumbnail,
      type: props.type,
    }
    this.postComment = this.postComment.bind(this);
    this.updateCommentList = this.updateCommentList.bind(this);
  }

  postComment(commentText) {
    const token = sessions.getToken('jwt');
    axios.get('/api', auth.makeTokenHeader(token))
      .then(res => {
        res.data.forEach(data => {
          if (this.state.postTitle === data.title) {
            return this.setState({ postId: data._id })
          }
        })
        return this.state.postId
      })
      .then((res) => {
        return axios.post(`/api/post/${this.state.postId}`, { body: commentText }, auth.makeTokenHeader(token))
      })
      .then(res => {
        res.data.comments = [];
        this.state.comments.push(res.data)
        this.setState({ comments: this.state.comments })
      })
      .then(res => {
        console.log('SUCCESSFUL COMMENT TO A POST')
      })
  }

  updateCommentList(comments) {
    this.setState({ comments });
  }

  render() {
    let display;
    if (this.state.type === 'Image') {
      display = (
        <div>
          <div className="topOfPage">
            <div className="postTitle">{this.state.postTitle}</div>
            <div id="textBy">(by <Link href={`/u/${this.props.author.username}`}><a>{this.props.author.username}</a></Link>)</div>
          </div>
          <div id="titleDate">{this.props.date}</div>
          <div className="postBody">
            <Img src={this.state.url} width={400} />
          </div>
        </div>
      );
    } else if (this.state.type === 'Article') {
      display = (
        <div>
          <div className="topOfPage">
            <div className="postTitle">{this.state.postTitle}</div>
            <div id="textBy">(by <Link href={`/u/${this.props.author.username}`}><a>{this.props.author.username}</a></Link>)</div>
          </div>
          <div id="titleDate">{this.props.date}</div>
          <div className="postBody">
            <a href={this.state.url}>{this.state.postTitle}</a>
            <img src={this.state.thumbnail} />
          </div>
        </div>
      );
    } else if (this.state.type === 'Text') {
      display = (
        <div>
          <div className="topOfPage">
            <div className="postTitle"> {this.state.postTitle}</div>
            <div id="textBy">(by <Link href={`/u/${this.props.author.username}`}><a>{this.props.author.username}</a></Link>)</div>
          </div>
          <div id="titleDate">{this.props.date}</div>
          <div className="postBody">
            <ReactMarkdown source={this.state.postBodyText} />
          </div>
        </div>
      );
    }
    return (
      <div>
        {display}

        Add a new comment
        <CommentForm title={this.state.title} subredditId={this.state.subredditId} postComment={this.postComment} />

        <CommentList
          comments={this.state.comments}
          allComments={this.state.comments}
          newCommentBody={this.state.commentBody}
          postId={this.state.postId}
          updateCommentList={this.updateCommentList}
        />

        <style>{`
          .postTitle {
            font-family: Arial, Helvetica, sans-serif;
          }
          .topOfPage {
            display: flex;
            align-items: center;
            padding: 10px 5px 9px 5px;
          }
          #textBy, #titleDate {
            padding-left: 5px;
            font-family: Arial, Helvetica, sans-serif;
          }
          #titleDate {
            font-size: 11px;
            font-color: gray;
            padding-bottom: 5px;
          }
          .postBody {
            padding: 4px 0 20px 0;
            border-style: solid;
            border-width: 1px;
            border-color: gray;
            border-radius: 10px;
            font-family: Arial, Helvetica, sans-serif;
            padding: 5px;
            
          } 
          #textBy {
            font-size: 12px;
          }
        `}</style>

      </div >


    );
  }
}

export default ParentPost;