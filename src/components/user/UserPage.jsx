import axios from "axios/index";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import UserNavBar from './UserNavBar.jsx';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { get } from "https";

import Graph from './statistics/Graph'
import ContentContainer from './ContentContainer';

import "./container.css";

class UserPage extends Component {

   render() {
      //const graphData = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page b', uv: 100, pv: 400, amt: 2400}];

      // let thermostatLinks = this.state.user.thermostats.map( thermostat => {
      //    return(
      //    <Link to={"/userpage/thermostat/"+thermostat._id} ></Link>
      //    );
      // })

      return (
         // add flex style
         <div className="container-flex">
            {/* <h1>   A </h1> */}
            {/* <h1>User page</h1>
            {thermostatLinks()}

            <Route path="/userpage/thermostat/:id" component={Graph}></Route>
            
            <MainContainer />
            <UserNavBar /> */}
            <Router>
               <UserNavBar />
               <ContentContainer />
            </Router>

         </div>
      );
   };
}

export default UserPage;
