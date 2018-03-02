import { Component } from 'react';
import Page from '../../components/Page';
import Posts from '../../components/Posts';
import Logo from '../../components/Logo'

import auth from '../../utils/auth';
import profile from '../../utils/profile';
import data from '../../utils/data';
import sessions from '../../utils/sessions';

class Profile extends Component {
  static async getInitialProps(context) {
    const session = await auth.initializeSession(context);
    const posts = await data.getPosts(session);

    return {
      subreddit: context.query.sub || null,
      user: session.user,
      token: session.token,
      posts,
    };
  }



  constructor (props) {
    super(props)
    this.state = {
      subreddit: this.props.subreddit,
      user: this.props.user,
      token: this.props.token,
      posts: this.props.posts,
    }
  }




  render () {
    console.log(this.props.subreddit)
    return(
      <Page>
        <div className="posts" >
          {this.state.posts}
        </div>
        <div className="accountInfo" >
          <div>
            <Logo />
            <h2>{this.props.user.username}</h2>
            <button className="newPost">Create New Post</button>
          </div>
          <p>Your Info</p>
          <ul className="info">
            
            <div className="birthday">
              <img src="https://vignette.wikia.nocookie.net/kpop/images/2/21/Birthday_Icon.png/revision/latest?cb=20161105130102" width={40} height={40}/>
              <span>
                <div>mtryska birthday</div>
                <div>February 20, 2018</div>
              </span>
            </div>
            <div className="Trophy">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Circle-icons-trophy.svg" width={40} height={40}/>
              <div>
                <div>Verfied Email</div>
              </div>
            </div>
          </ul>
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
