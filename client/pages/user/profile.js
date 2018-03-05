import Page from '../../components/Page';
import { Component } from 'react';
import Logo from '../../components/Logo'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }




  render () {
    return(
      <Page>
        <div className="posts" >
          <h3>Your Posts</h3>
        </div>
        <div className="accountInfo" >
          <div>
            <Logo />
            <p>Username: </p>
            <button className="newPost">Create New Post</button>
          </div>
          <p>Your Info</p>
          <ul className="info">
            
            <div className="birthday">
              <img src="https://vignette.wikia.nocookie.net/kpop/images/2/21/Birthday_Icon.png/revision/latest?cb=20161105130102" width={40} height={40}/>
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
          width: 70%;
          height: 600px;
        }
        .accountInfo {
          border: solid 2px;
          float: right;
          width: 25%;
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
