import axios from "axios";
import React, { Component } from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Button from '@material-ui/core/Button/index';
import { get } from "https";

import './graph.css';

import { Labels } from './string.js';

const hours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Graph extends Component {
   state = {
      graphType: "Day",
      graphInterval: "preserveEnd",
      currentThermostat: "Thermostat #1",
      granularity: hours,
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

      //do a day data population
      this.populateData(24, hours);
   };

   injectData = () => {
      let monthDaysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let data = [];

      for (let k = 0; k < 12; ++k) {
         for (let j = 0; j < monthDaysCount[k]; ++j) {
            let log = {
               year: 2018,
               month: 1,
               day: 1,
               thermostatId: "",
               masterDevId: "",
               cTemps: [],
               oTemps: [],
               sTemps: [],
            }
            log.month = k + 1;
            log.day = j + 1;
            for (let i = 0; i < 144; ++i) {
               log.sTemps[i] = 20 + this.getRandomInt(2);
               log.cTemps[i] = log.sTemps[i] - 1 - this.getRandomInt(3);
               log.oTemps[i] = log.sTemps[i] - 12 - this.getRandomInt(2);
            }
            data.push(log);
         }
      }

      console.log(data);
   }

   populateData = (amount, unit) => {
      let data = [];
      // will need to replace the for loop with axios.get request to get data from mongodb
      // use this,props.currentThermostat to find out which thermostat we want
      for (let i = 0; i < amount; ++i) {
         let tempData = { name: '', sTemp: 0, cTemp: 0, oTemp: 0 };
         tempData.name = unit[i];
         tempData.sTemp = 20 + this.getRandomInt(2);
         tempData.cTemp = tempData.sTemp - 1 - this.getRandomInt(3);
         tempData.oTemp = tempData.sTemp - 12 - this.getRandomInt(2);
         data[i] = tempData;
      }

      // update state with the data, 
      this.setState({ graphData: data, currentThermostat: this.props.currentThermostat, granularity: unit });
   }

   getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
   }

   updateGraph = async (type) => {
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
      if (prevProps.currentThermostat !== this.props.currentThermostat) {
         this.updateGraph(this.props.graphType, this.props.currentThermostat);
      }
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
                  <XAxis ticks={this.state.granularity} dataKey="name" interval={this.state.graphInterval} />
                  <YAxis label={{ value: 'Temperature (\xB0C)', angle: -90, position: 'center', dx: -15 }} />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="sTemp" stroke="orange" />
                  <Line type="monotone" dataKey="cTemp" stroke="green" />
                  <Line type="monotone" dataKey="oTemp" stroke="dodgerblue" />
               </LineChart>
            </ResponsiveContainer>
            <Button onClick={this.injectData}>Upload Fake Data</Button>
         </div>
      );
   };
}

export default Graph;
