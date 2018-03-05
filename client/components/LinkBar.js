class LinkBar extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <input value={this.link} onChange={this.props.linkChange} placeholder="link url" />
        <style jsx>
          {`
            input {
              width: 476px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default LinkBar;
