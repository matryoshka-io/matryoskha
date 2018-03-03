import { Component } from 'react';
import moment from 'moment';
import Link from 'next/link';

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
        <div className="container">
          <div className="profile__content">
            <div>
              <ul className="profile__navigation">
                <li><Link href={`/u/${user}/`}><a>Posts</a></Link></li>
                <li><Link href={`/u/${user}/comments`}><a>Comments</a></Link></li>
                <li><Link href={`/u/${user}/subreddits`}><a>Subreddits</a></Link></li>
              </ul>
            </div>
            <Posts
              posts={content}
              vote={this.castVote}
            />
          </div>
          <div className="profile__sidebar">
            <h3>{user}</h3>
            <span>Total Karma: {profile.karma}</span>
            <span>Joined: {moment(profile.date).fromNow()} </span>
            <button className="newPost">Create New Post</button>
          </div>
        </div>
        <style jsx>
          {`
            .container {
              display: flex;
              flex-direction: row;
            }
            .profile__navigation {
              margin: 0;
              height: 40px;
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: stretch;
            }
            .profile__navigation > * {
              height: 40px;
              text-align: center;
              list-style: none;
              flex: 1;
            }
            .profile__navigation a {
              cursor: pointer;
              font-size: 16px;
              font-weight: 700;
            }
            .profile__navigation a:hover {
            }
            .profile__content {
              border: solid 1px #333;
              margin-right: 8px;
              flex: 9;
            }
            .profile__sidebar {
              border: solid 1px #333;
              padding: 8px;
              flex: 1 200px;
            }
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
