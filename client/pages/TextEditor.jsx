import { Editor, EditorState, RichUtils } from 'draft-js';

class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      text: 'Testing',
    }
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState })
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick}>Bold</button> <br />
        <textarea rows="5" cols="50" name="commentBox" value={this.state.text}>

        </textarea>

        <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} />
      </div>
    )
  }
}

export default TextEditor;

