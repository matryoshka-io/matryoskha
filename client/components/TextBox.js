class TextBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <textarea row="8" cols="80" value={this.props.bodyText} onChange={this.props.onBodyTextChangeHandler} />
        <style jsx>
          {`
            textarea {
              line-height: 18px;
              font-size: 14px;
              width: 476px;
              height: 300px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default TextBox;
