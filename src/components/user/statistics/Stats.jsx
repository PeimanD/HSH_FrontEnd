import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Combobox } from 'react-widgets';
import Graph from './Graph';
import Grid from '@material-ui/core/Grid';

import 'react-widgets/dist/css/react-widgets.css';
import './graph.css';
import SideNav from "../SideNav";
import BadLogin from "../badlogin/badLogin";

class Stats extends Component {
  constructor(props) {
    super(props);

    if (props.day === null) {
      if (!(window.localStorage.statsState)) {
        this.props.history.push('/Login');
        return;
      } else {
        console.log("has state saved locally");
        this.state = JSON.parse(window.localStorage.statsState);
      }
    } else {
      this.state = {
        graphType: 'Day',
        //currentThermostat: 'Thermostat #1',
        currentThermostat: this.props.thermostats[0].thermostatId,
        day: this.props.day,
        week: this.props.week,
        month: this.props.month,
        year: this.props.year,
        data: this.props.day,
        thermostats: this.props.thermostats,
      };
      window.localStorage.setItem("statsState", JSON.stringify(this.state));
      console.log("new state saved locally");
    }
  };

  componentDidMount() {
    //this.setState({ currentThermostat: this.props.currentThermostat });
    console.log(this.state.day);
    console.log(this.state.week);
    console.log(this.state.month);
    console.log(this.state.year);
    console.log(this.state.thermostats);
  }

  changeDisplay = (type) => {
    this.setState({ graphType: type });
  };

  changeThermostat = (thermostat) => {
    this.setState({ currentThermostat: thermostat });
  };

  getThermostatId = () => {
    let id = [];
    for (let i = 0; i < this.state.thermostats.length; ++i) {
      id.push(this.state.thermostats[i].thermostatId);
    }
    return id;
  }

  render() {
    if (!(window.localStorage.token)) {
      return (
        <BadLogin />
      );
    }

    let graphOptions = ["Day", "Week", "Month", "Year"];
    let thermostats = this.getThermostatId();

    return (
      <div className="graph-outer-container">
        {/* drop down menu component to pick between day, week, month, year */}
        <SideNav />
        <div className="graph-combobox">
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Combobox
                data={graphOptions}
                defaultValue={'Day'}
                onChange={value => {
                  if (value === 'Day') {
                    this.setState({ graphType: value, data: this.state.day });
                  } else if (value === 'Week') {
                    this.setState({ graphType: value, data: this.state.week });
                  } else if (value === 'Month') {
                    this.setState({ graphType: value, data: this.state.month });
                  } else {
                    this.setState({ graphType: value, data: this.state.year });
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Combobox
                data={thermostats}
                defaultValue={this.state.currentThermostat}
                onChange={value => {
                  this.setState({ graphType: this.state.graphType, currentThermostat: value });
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="graph-mid-container card">
          <Graph graphType={this.state.graphType} currentThermostat={this.state.currentThermostat} data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default withRouter(Stats);