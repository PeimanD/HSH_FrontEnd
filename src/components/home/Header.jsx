import React from "react"
import logo from '../../assets/images/logo.png'
import building0 from '../../assets/images/building0.jpg';
import "../css/vendor/bootstrap/css/bootstrap.min.css";
import "./animate.css";
import "./full-width-pics.css";
import "./Header.css";

function Header() {
    return(
        <div>
            {/* **************** Header **************** */}
            <header class= "header_background">
                {/* <img src = {building0}/> */}
                {/* <img class="py-5 bg-image-full" style="background-image" src={building0} /> */}
            <div class="float-right">
                <a href="login.html">
                <button type="button" class="btn btn-outline-warning btn-xl">
                    <img class="animated bounce img-fluid d-block mx-auto" src={logo}/>
                    Login
                </button>
                </a>
                {/* <button type="button" class="btn btn-outline-danger btn-xl">Find Out More
                */}
            </div>
            </header>
        
            {/* **************** Content section **************** */}
            <section class="py-5">
                <div class="container">
                    <h1>A Smart Thermostat Reimagined </h1>
                    <p class="lead">A low-cost smart thermostat, realized as a system of modular devices 
                        with a central unit.</p>
                    <p>Smart thermostats add comfort, accessibility and energy saving capabilities to a 
                        home. Most smart thermostats in the market have some negative drawbacks as they 
                        are costly and it is not feasible to install one in every apartment room. 
                        <strong>We are creating a smart expandable modular thermostats that can provide 
                            maximum energy efficiency without the cost and complexity of installing 
                            expensive thermostats seperatly in each room.</strong> As modular units, 
                            these thermostats are expandable, allowing the users to add as many units as 
                            needed to control the various sections of an apartment, house or office. One 
                            centeral account controls all the units in a user friendly enterface.</p>
                </div>
            </section>
        </div>
    );
}

export default Header;



 {/* <p>Sign up here and find out more about the project and its progress.</p>
            {/* ***** Begin Mailchimp Signup Form ***** }
    <div id="mc_embed_signup center-block">
    <form action="https://herokuapp.us7.list-manage.com/subscribe/post?u=da22b417c6237181a9adbe30c&amp;id=b9b13fc66e" 
        method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
            <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
            </div>    
            {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups }
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input type="text" name="b_da22b417c6237181a9adbe30c_b9b13fc66e" tabindex="-1" value=""/>
            </div>
            <div class="clear">
                <input class="btn btn-outline-info btn-xl center-block" type="submit" value="Find Out More" 
                    name="subscribe" id="mc-embedded-subscribe" class="button"/>
            </div>
        </div>
    </form>
    </div>  
    {/* End MailChimp Signuo button }
*/}