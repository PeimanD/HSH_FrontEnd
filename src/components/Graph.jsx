import axios from "axios";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import UserNavBar from './UserNavBar.jsx';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { get } from "https";

class Graph extends Component {
   state = {
      graphData : [],
      uv : 400,
      amt : 2400
   };

   async componentDidMount () {
      //set host as enviornment variable
      let host = "http://localhost:3000";
      //const { data } = await axios.get(host+"/api/thermostat/"+this.match.params.id);
      //format data
      

      //this.setState({graphData: data});
       
   };

   render () {
      return(
         <div>
            <LineChart width={600} height={300} data={this.state.graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
               <Line type="monotone" dataKey="uv" stroke="#8884d8" />
               <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
            </LineChart>
         </div>
      );
   };
}

export default Graph;
