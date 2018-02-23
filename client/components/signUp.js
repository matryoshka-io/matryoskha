

export default (props) => (
    <form>
        <div>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <div>
                <p>Username</p>
                <input type="text" placeholder="Enter Username" className="username" required></input>
            </div>
            <div>
                <p>Password</p>
                <input type="password" placeholder="Enter Password" className="psw" required></input>
            </div>
            <div>    
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" className="psw-repeat" required></input>
            </div>

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

            <div className="clearfix">
            <button type="button" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn">Sign Up</button>
            </div>
        </div> 
    </form>

)

