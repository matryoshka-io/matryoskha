import Link from 'next/link'
// import Registration from './'

export default () => (

    <form >
    <div className="login">
    <h1>Login</h1>
    <div>
      <span>name</span>
      <input id="usernameInput" className="usernameInput" />
    </div>
    <span>password</span>  
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
        .usernameInput {
            margin-right: 100px;
        }


      `}</style>
    </div> 
    
    </form>

)
