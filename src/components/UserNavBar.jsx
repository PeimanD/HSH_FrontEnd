import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class UserNavBar extends Component {
   render() {
     return (
        <Router>
           <Link to="/" value="UserNav bar" />
        </Router>
     );
   };
}

export default UserNavBar;
