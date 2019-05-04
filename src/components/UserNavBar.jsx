import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "./css/secondNav.css";

class UserNavBar extends Component {
   render() {
      return (
         <div className="secondNav-parent">
            <div className="secondNav-child"><Link to="/thermoCards">User Home</Link></div>
            <div className="secondNav-child"><Link to="/stats">Statistic</Link></div>
            <div className="secondNav-child"><Link to="/settings">Settings</Link></div>
         </div>
      );
   };
}

export default UserNavBar;
