import React from 'react';
import top_logo from './img/logo.png';
import {Link}  from "react-router-dom";

import "./css/vendor/bootstrap/css/bootstrap.min.css";
import "./css/animate.css";
import "./css/full-width-pics.css";
import "./css/NavBar.css";
//import ReactDOM from 'react-dom';

function MyNavBar() {
    return(
        // **************** Navigation ****************
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link to= "/" className="navbar-brand"> 
            <img src={top_logo} className="top_logo" />
              <span className="brand-text"> Home Sweet Home</span>
              {/* <span className="sr-only">(current)</span> */}
            </Link> 
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" 
                    aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active"> 
                {/* active Means the item lights white
                Need to make it change depending on what page the user is in*/}
                  <Link className="nav-link" to= "/">Home</Link> 
                    {/* <span className="sr-only">(current)</span> */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to= "/login">Login</Link> 
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Signup</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default MyNavBar;