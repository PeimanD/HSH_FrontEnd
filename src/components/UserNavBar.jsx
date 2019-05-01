import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class UserNavBar extends Component {
   render() {
      return (
         <div className="secondNav-parent">
            <div className="secondNav-child"><Link to="/thermoCard">User Home</Link></div>
            <div className="secondNav-child"><Link to="/stats">Statistic</Link></div>
         </div>
      );
   };
}

export default UserNavBar;
