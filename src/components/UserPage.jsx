import axios from "axios";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import UserNavBar from './UserNavBar.jsx';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { get } from "https";

import Graph from './Graph'



class UserPage extends Component {
   state = {
      user : null
   };

   async componentDidMount () {
      //set host as enviornment variable
      let host = "http://localhost:3000";
      const { data } = await axios.get(host+"/api/users/me");
      //format data

      this.setState({user: data.user});
   };
  // [{_id: 1, name: "tes"},{_id: 2, name: "name"},{_id: 3, name: "sdf"}]

   render() {
      //const graphData = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page b', uv: 100, pv: 400, amt: 2400}];
      let thermostatLinks = this.state.user.thermostats.map( thermostat => {
         return(
         <Link to={"/userpage/thermostat/"+thermostat._id} ></Link>
         );
      })
     return (
        <div>
           <h1>   A </h1>
           <h1>User page</h1>
            {thermostatLinks}
            <Route path="/userpage/thermostat/:id" component={Graph}></Route>
            
           <UserNavBar />
        </div>
     );
   };
}

export default UserPage;
