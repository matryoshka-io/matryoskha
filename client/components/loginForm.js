
export default () => (

    <form >
    <div className="login">
    <h1>Login</h1>
    <div>
      <input type="email" className="usernameInput"/>
    </div>
    <div>
      <input type="password" className="passwordInput"/>
    </div>
    <div>
        <button className="loginButton">Login</button> 
        <button className="signinBUtton">Sign Up</button>
    </div>
      <style jsx>{`
        h1 {
            text-align: center
        }
        .usernameInput {
            margin-right: 100px;
        }


      `}</style>
    </div> 
    
    </form>

)
