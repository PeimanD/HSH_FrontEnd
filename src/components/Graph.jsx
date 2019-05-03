import axios from "axios";
import React, { Component } from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { get } from "https";

import './css/graph.css';

import { Labels } from './string.js';

const hours = ["00:00", "01:00", "02:00", "03:00", "04:00","05:00", "06:00","07:00", "08:00","09:00", "10:00","11:00", "12:00","13:00", "14:00","15:00", "16:00","17:00", "18:00","19:00", "20:00","21:00", "22:00", "23:00"]
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Graph extends Component {
   state = {
      graphType: "Day",
      graphInterval: "preserveEnd",
      graphData: [
         {
            name: '00:00', sTemp: 21, cTemp: 18, oTemp: 2,
         },
         {
            name: '01:00', sTemp: 21, cTemp: 18, oTemp: 4
         },
      ],
   };

   async componentDidMount() {
      //set host as enviornment variable
      let host = "http://localhost:3000";

      //const { data } = await axios.get(host+"/api/thermostat/"+this.match.params.id);
      //this.setState({graphData: data});
      this.populateData(24, hours);
   };

   populateData = (amount, unit) => {
      let data = [];
      for (let i = 0; i < amount; ++i) {
         let tempData = {name: '', sTemp: 0, cTemp: 0, oTemp: 0};
         tempData.name = unit[i];
         tempData.sTemp = 20 + this.getRandomInt(2);
         tempData.cTemp = tempData.sTemp - 1 - this.getRandomInt(3);
         tempData.oTemp = tempData.sTemp - 12 - this.getRandomInt(2);
         data[i] = tempData;
      }
      this.setState({graphData: data});
   }

   getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
   }

   updateGraph = (type) => {
      switch (type) {
         case "Day":
            //axio get Day data
            this.populateData(24, hours);
            break;
         case "Week":
            //axio get Week data
            this.populateData(7, weekDays);
            break;
         case "Month":
            //axio get Month data
            this.populateData(30, this.getMonth());
            break;
         default:
            //axio get Year data
            this.populateData(12, months);
            break;
      }
   }

   getMonth = () => {
      let date = new Date();
      let curMonth = date.getMonth();
      let dateArray = [];
      let numDays = new Date(date.getFullYear(), curMonth + 1, 0).getDate();
      for (let i = 0; i < numDays; ++i) {
         dateArray[i] = months[curMonth] + " " + (i + 1); 
      }
      return dateArray;
   }

   componentDidUpdate(prevProps) {
      if (prevProps.graphType !== this.props.graphType) {
         this.updateGraph(this.props.graphType);
      }
   }

   render() {
      return (
         <div className="graph-inner-container">
            <ResponsiveContainer>
               <LineChart data={this.state.graphData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" interval={this.state.graphInterval} />
                  <YAxis label={{ value: 'Temperature (\xB0C)', angle: -90, position: 'center', dx: -15}} />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="sTemp" stroke="orange" />
                  <Line type="monotone" dataKey="cTemp" stroke="green" />
                  <Line type="monotone" dataKey="oTemp" stroke="dodgerblue" />
               </LineChart>
            </ResponsiveContainer>
         </div>
      );
   };
}

export default Graph;
