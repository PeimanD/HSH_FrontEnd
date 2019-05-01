import React from "react";
import Top_Login from './img/logo.png';
import { Link } from "react-router-dom";


function Login() {
    return(
        // <!-- **************** Login Box **************** -->
        <div class="loginbox">
            {/* </div><img src={Logo} class="avatar"> */}
                    <h1>Login Here</h1>
                    <form>
                        <p>Username</p>
                        <input type="text" name="uname" placeholder="Enter Username"/>
                        <p>Password</p>
                        <input type="password" name="upass" placeholder="Enter Password"/>
                        <Link to= "/userpage" type="submit" name="" >Login </Link>
                        <a href="#">Forgot your Password?</a>
                        <a href="register.html">Don't have an account? </a>
                    </form>
        </div>
    );
}

export default Login;