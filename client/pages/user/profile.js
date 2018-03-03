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
    return(
      <Page>
        <div className="posts" >

        <Posts posts=
          {   
            this.props.posts.filter(post => {
                return post.author.username === this.props.user.username
                })
          } />
        </div>
        <div className="accountInfo" >
          <div className="logo__info">
            <Logo />
            <h2>{this.props.user.username}</h2>
          </div>
          <ul className="info">
            
            <div className="birthday">
              <img src="https://vignette.wikia.nocookie.net/kpop/images/2/21/Birthday_Icon.png/revision/latest?cb=20161105130102" width={45} height={40}/>
              <div>
                <div>mtryska birthday</div>
                <div>February 20, 2018</div>
              </div>
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

         .logo__info {
           padding-right: 70px;
           padding-top: 20px;
         }
         .newPost  {
           align: center;
         }
         .Trophy {
          display:flex;
          padding-top: 30px;
         }
      
         .birthday {
          display:flex;
         }
         h3 {
           text-align: center;
         }
         .posts {
          float: left;
          width: 78%;
        }
        .accountInfo {
          text-align: center;
          background: #696775;
          float: right;
          width: 20%
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
