import { Component } from 'react';
import moment from 'moment';

import Page from '../../components/Page';
import Posts from '../../components/Posts';
import Logo from '../../components/Logo';

import profile from '../../utils/profile';

class Profile extends Component {
  static async getInitialProps(context) {
    const profileContent = await profile.initializeProfilePage(context);
    console.log(profileContent);

    return profileContent;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      profile: this.props.profile,
      content: this.props.content,
      type: this.props.type,
    };
  }

  castVote() {

  }

  render() {
    const { user, profile, content } = this.state;
    return (
      <Page>
        <div className="posts" >
          <Posts
            posts={content}
            vote={this.castVote}
          />
        </div>
        <div className="accountInfo" >
          <div>
            <h2>{user}</h2>
            <span>Total Karma: {profile.karma}</span>
            <span>Joined: {moment(profile.date).fromNow()} </span>
            <button className="newPost">Create New Post</button>
          </div>
        </div>

        <style jsx>
          {`
          .newPost  {
            align: center;
          }
          .Trophy {
            display:inline-flex;
            padding-top: 30px;
          }

          .birthday {
            display:inline-flex;
          }
          h3 {
            text-align: center;
          }
          .posts {
            border: solid 2px;
            float: left;
            width: 78%;
            height: 600px;
          }
          .accountInfo {
            border: solid 2px;
            float: right;
            width: 20%;
            height: 600px;
          } * {
            border:1
          }
          `}
        </style>
      </Page>
    )
  }
}

export default Profile;
