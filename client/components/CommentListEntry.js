import CommentList from './CommentList';
import ReactMarkdown from 'react-markdown';

class CommentListEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('entry props', this.props)
    return (
      < div >
        <ReactMarkdown source={this.props.comment.body} />
        <CommentList comments={this.props.comment.comments} />
      </div >
    )
  }
}

export default CommentListEntry