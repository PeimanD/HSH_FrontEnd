import React, { Component } from 'react';
import { withRouter } from "react-router";
import { DropdownList } from 'react-widgets';
import Graph from './Graph';
import Grid from '@material-ui/core/Grid';

import 'react-widgets/dist/css/react-widgets.css';
import './graph.css';
import SideNav from "../SideNav";
import BadLogin from "../badlogin/BadLogin";
import BadData from "./BadData";
import axios from "axios";

const graphOptions = ["Day", "Week", "Month", "Year"];

class Stats extends Component {
  constructor(props) {
    super(props);

    if (props.thermostats[0].id === 1) {
      if (!(window.localStorage.statsState)) {
        this.props.history.push('/Login');
      } else {
        this.state = JSON.parse(window.localStorage.statsState);
      }
    } else {
      this.state = {
        graphType: 'Day',
        currentIndex: 0,
        day: {
          sTemps: [0],
          cTemps: [0],
          oTemps: [0],
        },
        week: [
          {
            sTemps: [0],
            cTemps: [0],
            oTemps: [0],
          }
        ],
        month: [
          {
            sTemps: [0],
            cTemps: [0],
            oTemps: [0],
          }
        ],
        year: [
          {
            sTemps: [0],
            cTemps: [0],
            oTemps: [0],
          }
        ],
        data: {
          sTemps: [0],
          cTemps: [0],
          oTemps: [0],
        },
        thermostats: this.props.thermostats,
        firstLoad: true,
        badRequest: false,
      };
      window.localStorage.setItem("statsState", JSON.stringify(this.state));
    }
  };

  async componentDidMount() {
    if (this.state) {
      this.getDayData(this.state.currentIndex);
    }
  }

  getDayData = async (index) => {
    let date = new Date();
    let dayDate = date.getDate();
    let monthDate = date.getMonth() + 1;
    let yearDate = date.getFullYear();
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/day", {
        headers: {
          "x-auth-token": window.localStorage.token,
        },
        params: {
          master_id: this.state.thermostats[index].masterDevId,
          thermostat_id: this.state.thermostats[index].thermostatId,
          day: dayDate,
          month: monthDate,
          year: yearDate
        }
      });
      this.setState({ graphType: 'Day', data: data, day: data, currentIndex: index, firstLoad: false, badRequest: false });
    } catch (e) {
      if (e.response.status === 404) {
        this.setState({ badRequest: true, firstLoad: false });
        return;
      }
      if (e.response.status === 401) {
        this.props.history.push("/BadLogin")
        return;
      }
      this.props.history.push("/Login");
    }
  }

  getWeekData = async (index) => {
    let date = new Date();
    let monthDate = date.getMonth() + 1;
    let yearDate = date.getFullYear();
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/week", {
        headers: {
          "x-auth-token": window.localStorage.token,
        },
        params: {
          master_id: this.state.thermostats[index].masterDevId,
          thermostat_id: this.state.thermostats[index].thermostatId,
          day: 8,
          month: monthDate,
          year: yearDate
        }
      });
      this.setState({ graphType: 'Week', data: data, week: data, currentIndex: index, badRequest: false });
    } catch (e) {
      if (e.response.status === 404) {
        this.setState({ badRequest: true, firstLoad: false });
        return;
      }
      if (e.response.status === 401) {
        this.props.history.push("/BadLogin")
        return;
      }
      this.props.history.push("/Login");
    }
  }

  getMonthData = async (index) => {
    let date = new Date();
    let monthDate = date.getMonth() + 1;
    let yearDate = date.getFullYear();
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/month", {
        headers: {
          "x-auth-token": window.localStorage.token,
        },
        params: {
          master_id: this.state.thermostats[index].masterDevId,
          thermostat_id: this.state.thermostats[index].thermostatId,
          month: monthDate,
          year: yearDate
        }
      });
      this.setState({ graphType: 'Month', data: data, month: data, currentIndex: index, badRequest: false });
    } catch (e) {;
      if (e.response.status === 404) {
        this.setState({ badRequest: true, firstLoad: false });
        return;
      }
      if (e.response.status === 401) {
        this.props.history.push("/BadLogin")
        return;
      }
      this.props.history.push("/Login");
    }
  }

  getYearData = async (index) => {
    let yearDate = new Date().getFullYear();
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/year", {
        headers: {
          "x-auth-token": window.localStorage.token,
        },
        params: {
          master_id: this.state.thermostats[index].masterDevId,
          thermostat_id: this.state.thermostats[index].thermostatId,
          year: yearDate
        }
      });
      this.setState({ graphType: 'Year', data: data, year: data, currentIndex: index, badRequest: false });
    } catch (e) {
      if (e.response.status === 404) {
        this.setState({ badRequest: true, firstLoad: false });
        return;
      }
      if (e.response.status === 401) {
        this.props.history.push("/BadLogin")
        return;
      }
      this.props.history.push("/Login");
    }
  }

  getThermostatName = () => {
    let name = [];
    for (let i = 0; i < this.state.thermostats.length; ++i) {
      let item = { id: 0, name: "", };
      item.id = i;
      item.name = this.state.thermostats[i].roomName
      name.push(item);
    }
    return name;
  }

  render() {
    if (!(window.localStorage.token)) {
      return (
        <BadLogin history={this.props.history}/>
      );
    }

    let thermostats = this.getThermostatName();
    let graph;

    if (this.state.badRequest) {
      graph = (this.state.firstLoad) ? <></> : <BadData history={this.props.history} />;
    } else {
      graph = (this.state.firstLoad) ? <></> : <Graph graphType={this.state.graphType} currentThermostat={this.state.thermostats[this.state.currentIndex].thermostatId} data={this.state.data} />
    }

    return (
      <div className="graph-outer-container">
        {/* drop down menu component to pick between day, week, month, year */}
        <SideNav />
        <div className="graph-combobox">
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <DropdownList
                data={graphOptions}
                defaultValue={'Day'}
                onChange={async value => {
                  if (value === 'Day') {
                    this.getDayData(this.state.currentIndex);
                  } else if (value === 'Week') {
                    this.getWeekData(this.state.currentIndex);
                  } else if (value === 'Month') {
                    this.getMonthData(this.state.currentIndex);
                  } else {
                    this.getYearData(this.state.currentIndex);
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <DropdownList
                data={thermostats}
                defaultValue={this.state.thermostats[this.state.currentIndex].roomName}
                valueField="id"
                textField="name"
                onChange={async value => {
                  switch (this.state.graphType) {
                    case "Day":
                      this.getDayData(value.id);
                      break;
                    case "Week":
                      this.getWeekData(value.id);
                      break;
                    case "Month":
                      this.getMonthData(value.id);
                      break;
                    default:
                      this.getYearData(value.id);
                      break;
                  }
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="graph-mid-container card">
          {/* <Graph graphType={this.state.graphType} currentThermostat={this.state.currentThermostat} data={this.state.data} /> */}
          {graph}
        </div>
      </div>
    );
  }
}

export default withRouter(Stats);