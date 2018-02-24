import React from 'react'

export default class SignUp extends React.Component {
    constructor (props){
        super(props)
        this.state= {
        }
        this.getCredential = this.getCredential.bind(this)
        this.getData = this.getData.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
    }

     getCredential = (e) => {
        let context = this
        var value = e.target.value
        var name = e.target.name
        console.log(name, value)
        
        context.setState({ 
        [name]: value
        })
    }

     checkPassword = () => {
      let pass1 = this.state.password
      let pass2 = this.state.passwordr
      if(pass1 === pass2) {
          return true
      } else {
          return false
      }
    }
    
     getData = () => {
        if(this.checkPassword()) {
          console.log('the new user is ', this.state)
        } else {
            console.log('Password dont match')
        } 
    }


    render() {
        return (

            <form >
                <div>
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <div>
                        <p>Username</p>
                        <input type="text" placeholder="Enter Username" name="username" required
                         onChange={this.getCredential}
                        />
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" placeholder="Enter Password" name="password" required
                         onChange={this.getCredential}
                        />
                    </div>
                    <div>    
                        <p>Repeat Password</p>
                        <input type="password" placeholder="Repeat Password" name="passwordr" 
                         onChange={this.getCredential}
                        />
                    </div>
        
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
        
                    <div className="clearfix">
                    <button type="button" className="cancelbtn">Cancel</button>
                    <button type="button" className="signupbtn" onClick={this.getData}>Sign Up</button>
                    </div>
                </div> 
            </form>
        )
    }

}

