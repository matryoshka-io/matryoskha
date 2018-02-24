class TextBox extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      < div >
        Text: <br />
        <textarea row="8" cols="80" value={this.bodyText} onChange={this.props.onBodyTextChangeHandler}>
        </textarea>
      </div >
    )
  }
}

export default TextBox;