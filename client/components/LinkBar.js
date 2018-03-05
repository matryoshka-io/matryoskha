class LinkBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Link: <br />
        <input value={this.link} onChange={this.props.linkChange} /> <br />
      </div>      
    );
  }
}

export default LinkBar;
