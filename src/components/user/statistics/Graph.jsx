import axios from "axios";
import React, { Component } from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { get } from "https";

import './graph.css';

import { Labels } from './string.js';

const hours = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["1/1", "2/1", "3/1", "4/1", "5/1", "6/1", "7/1", "8/1", "9/1", "10/1", "11/1", "12/1"];
let monthCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
      // let length = this.props.data.cTemps.length;
      // let data = {
      //    sTemp: this.props.data.sTemps,
      //    cTemp: this.props.data.cTemps,
      //    oTemp: this.props.data.oTemps,
      // }
      // this.populateData(this.makeDayAxis(length), data, hours);
      this.updateGraph(this.state.graphType);
   };

   adjustLeapYear = (year) => {
      if (new Date(year, 1, 29).getDate() === 29) {
         monthCount[1] = 29;
      }
   }

   populateData = (xaxis, array, type) => {
      let data = [];
      for (let i = 0; i < array.sTemp.length; ++i) {
         let tempData = { name: '', sTemp: 0, cTemp: 0, oTemp: 0 };
         tempData.name = xaxis[i];
         tempData.sTemp = array.sTemp[i];
         tempData.cTemp = array.cTemp[i];
         tempData.oTemp = array.oTemp[i];
         data[i] = tempData;
      }

      // update state with the data, 
      this.setState({ graphData: data, currentThermostat: this.props.currentThermostat, granularity: type });
   }

   updateGraph = async (type) => {
      let length = 0;
      let data = {
         sTemp: [],
         cTemp: [],
         oTemp: [],
      }
      switch (type) {
         case "Day":
            length = this.props.data.sTemps.length;
            data.sTemp = this.props.data.sTemps;
            data.cTemp = this.props.data.cTemps;
            data.oTemp = this.props.data.oTemps;
            this.populateData(this.makeDayAxis(length), data, hours);
            break;
         case "Week":
            length = this.props.data[0].sTemps.length;
            for (let i = 0; i < this.props.data.length; ++i) {
               data.sTemp.push(this.makeAverage(this.props.data[i].sTemps));
               data.cTemp.push(this.makeAverage(this.props.data[i].cTemps));
               data.oTemp.push(this.makeAverage(this.props.data[i].oTemps));
            }
            this.populateData(this.makeWeekAxis(length), data, weekDays);
            break;
         case "Month":
            length = this.props.data[0].sTemps.length;
            for (let i = 0; i < this.props.data.length; ++i) {
               data.sTemp.push(this.makeAverage(this.props.data[i].sTemps));
               data.cTemp.push(this.makeAverage(this.props.data[i].cTemps));
               data.oTemp.push(this.makeAverage(this.props.data[i].oTemps));
            }
            this.populateData(this.makeMonthAxis(length, this.props.data[0].month), data, []);
            break;
         default:
            this.adjustLeapYear(this.props.data[0].year);
            length = this.props.data[0].sTemps.length;
            for (let i = 0; i < this.props.data.length; ++i) {
               data.sTemp.push(this.makeAverage(this.props.data[i].sTemps));
               data.cTemp.push(this.makeAverage(this.props.data[i].cTemps));
               data.oTemp.push(this.makeAverage(this.props.data[i].oTemps));
            }
            this.populateData(this.makeYearAxis(length), data, months);
            break;
      }
      console.log(this.props);
   }

   makeDayAxis = (length) => {
      let xaxis = [];
      let hour = -1;

      for (let i = 0; i < length; ++i) {
         if (i % 6 == 0) {
            ++hour;
         }
         let min = i % 6;
         let axisString = hour + ":" + min + "0";
         xaxis.push(axisString);
      }
      return xaxis;
   }

   makeWeekAxis = (length) => {
      let xaxis = [];
      for (let i = 0; i < length; ++i) {
         xaxis.push(weekDays[i]);
      }
      return xaxis;
   }

   makeMonthAxis = (length, month) => {
      let xaxis = [];
      for (let i = 1; i <= length; ++i) {
         let axisString = month + "/" + i;
         xaxis.push(axisString);
      }
      return xaxis;
   }

   makeYearAxis = (length) => {
      let xaxis = [];
      let counter = 0;
      let month = 0;

      for (let j = 0; j < 12; ++j) {
         ++month;
         let day = 0;
         for (let i = 0; i < monthCount[j]; ++i) {
            ++day;
            let axisString = month + "/" + day;
            xaxis.push(axisString);
            ++counter;
            if (counter >= length) {
               console.log(xaxis);
               return xaxis;
            }
         }
      }
      console.log(xaxis);
      return xaxis;
   }

   makeAverage = array => {
      let sum = array.reduce(
         (previous, current) => {
            return current + previous;
         });
      let average = sum / array.length;
      return Math.round(average * 100) / 100;
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

                  <Line type="monotone" dataKey="sTemp" stroke="orange" dot={false}/>
                  <Line type="monotone" dataKey="cTemp" stroke="green" dot={false}/>
                  <Line type="monotone" dataKey="oTemp" stroke="dodgerblue" dot={false}/>

                  <Legend wrapperStyle={{ bottom: -10 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      );
   };
}

export default Graph;
