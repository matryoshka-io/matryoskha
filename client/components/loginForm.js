import Link from 'next/link'
// import Registration from './'

export default () => (

    <form className="logForm">
    <div className="login">
    <h1>Login</h1>
    <div>
      <div>name</div>
      <input id="usernameInput" className="usernameInput" />
    </div>
      <div>password</div>  
    <div>
     <input type="password" className="passwordInput"/>
    </div>
    <div>
        <button className="loginButton"><Link href="/login"><a>Login</a></Link></button>
        <button className="signinBUtton"><Link href="/signup"><a>Sign Up</a></Link></button>
    </div>
      <style jsx>{`
        h1 {
            text-align: center  
        }
        div {
            margin-left: 50px;
        }
        .usernameInput {
           
        }
        .login {
        
        }

      `}</style>
    </div> 
    
    </form>

)
