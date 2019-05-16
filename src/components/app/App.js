import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";

import NavBar from "./Navbar";
import Home from "../home/Home";
import Login from "../login/Login";
import Thermostats from "../user/thermostats/Thermostats";
import Schedule from "../user/schedule/Schedule";
import Statistics from "../user/statistics/Stats";
import axios from "axios";

let handler;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReceived: false,
      thermostats: [],
      day: {
        sTemps: [0],
        cTemps: [0],
        oTemps: [0]
      },
      week: null,
      month: null,
      year: null,
      firstLoad: true,
      schedule_cur_thermo_id: 0,
      isThermoSelected: false
    };
  }

  componentDidMount() {
    let host = "http://localhost:3000";
    try {
    } catch (e) {}
  }

  updateThermostat = async () => {
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/thermostat/all", {
        headers: {
          "x-auth-token": window.localStorage.token
        }
      });
      this.setState({ thermostats: data.thermostats, dataReceived: true });
      console.log("app updateThermostat:");
      console.log(this.state.thermostats);
    } catch (e) {}
  };

  // updateSchedule = async (thermostatId, masterDevId) => {
  //     try {
  //         let host = "http://localhost:3000";
  //         let {data} = await axios.get(host + "/api/schedule", {
  //             headers: {
  //                 "x-auth-token": window.localStorage.token,
  //             },
  //             params: {
  //                 master_id: 'ree',
  //                 thermostat_id: 'pre-ree',
  //             }
  //         });
  //         // this.setState({schedule: data.thermostats, dataReceived: true});
  //         console.log("app updateSchedule:");
  //         console.log(data);
  //     } catch (e) {
  //
  //     }
  // };

  updateStatisticDay = async (thermostatId, masterDevId) => {
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/day", {
        headers: {
          "x-auth-token": window.localStorage.token
        },
        params: {
          master_id: "ree",
          thermostat_id: "pre-ree",
          day: 8,
          month: 5,
          year: 2019
        }
      });

      console.log("got data:", data);
      this.setState({ day: data, firstLoad: false });
    } catch (e) {}
  };

  updateStatisticWeek = async (thermostatId, masterDevId) => {
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/week", {
        headers: {
          "x-auth-token": window.localStorage.token
        },
        params: {
          master_id: "ree",
          thermostat_id: "pre-ree",
          day: 8,
          month: 5,
          year: 2019
        }
      });
      this.setState({ week: data });
    } catch (e) {}
  };

  updateStatisticMonth = async (thermostatId, masterDevId) => {
    try {
      let host = "http://localhost:3000";
      let { data } = await axios.get(host + "/api/log/month", {
        headers: {
          "x-auth-token": window.localStorage.token
        },
        params: {
          master_id: "ree",
          thermostat_id: "pre-ree",
          month: 5,
          year: 2019
        }
      });
      this.setState({ month: data });
    } catch (e) {}
  };

  updateStatisticYear = async (thermostatId, masterDevId) => {
    try {
      let host = "http://localhost:3000";
      let { data } = axios.get(host + "/api/log/year", {
        headers: {
          "x-auth-token": window.localStorage.token
        },
        params: {
          master_id: "ree",
          thermostat_id: "pre-ree",
          year: 2019
        }
      });
      this.setState({ year: data });
    } catch (e) {}
  };

  set_schedule_cur_thermo_id = selected_thermostat => {
    this.setState(
      { schedule_cur_thermo_id: selected_thermostat, isThermoSelected: true },
      () => {
        console.log(this.state.schedule_cur_thermo_id);
        // window.location.assign('/Schedule');
      }
    );
  };

  /**
   * Thermostat controlled components
   */
  onThermoStatusChange = (status, thermostat_index) => {
    const { thermostats } = { ...this.state };
    const newState = thermostats;
    newState[thermostat_index].status = status;
    this.setState({ thermostats: newState });
  };
  onThermoModeChange = (mode, thermostat_index) => {
    const { thermostats } = { ...this.state };
    const newThermostats = thermostats;
    newThermostats[thermostat_index].mode = parseInt(mode);
    this.setState({ thermostats: newThermostats });
  };
  onThermoScheduleChange = (val, thermostat_index, day, hour_index) => {
    // onThermoScheduleChange = (thermostat_index, day, array) => {
    // console.log(
    //   `onThermoScheduleChange weekDay: ${day} thermo_idx: ${thermostat_index} slider:${hour_index}, val: ${val}`
    // );
    // clearTimeout(handler);
    // handler = setTimeout(() => {
    //   this.setState(prevState => {
    //     const thermostats = [...prevState.thermostats];
    //     let newDay = [...thermostats[thermostat_index].weekSchedule[day]];
    //     newDay[hour_index] = val;
    //     thermostats[thermostat_index] = {
    //       ...thermostats[thermostat_index],
    //       weekSchedule: {
    //         ...thermostats[thermostat_index].weekSchedule,
    //         [day]: newDay
    //       }
    //     };
    //     return { ...this.state, thermostats };
    //   });
    // }, 30);

    this.setState(prevState => {
      const thermostats = [...prevState.thermostats];
      let newDay = [...thermostats[thermostat_index].weekSchedule[day]];
      newDay[hour_index] = val;
      thermostats[thermostat_index] = {
        ...thermostats[thermostat_index],
        weekSchedule: {
          ...thermostats[thermostat_index].weekSchedule,
          [day]: newDay
        }
      };
      return { ...this.state, thermostats };
    });
  };

  /**
   * Remove dis later
   */
  checkState = EventTarget => {
    console.log(this.state);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <section className="margin-space">
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route path="/login" component={Login}/> */}
              <Route
                path="/login"
                render={routeProps => <Login {...routeProps} />}
              />
              <Route
                path="/Thermostats"
                render={() => (
                  <Thermostats
                    update={this.updateThermostat}
                    thermostats={this.state.thermostats}
                    dataReceived={this.state.dataReceived}
                    set_schedule_cur_thermo_id={this.set_schedule_cur_thermo_id}
                  />
                )}
              />
              <Route
                path="/Statistics"
                render={() => (
                  <Statistics
                    day={this.state.day}
                    week={this.state.week}
                    month={this.state.month}
                    year={this.state.year}
                    thermostats={this.state.thermostats}
                    firstLoad={this.state.firstLoad}
                    updateDay={this.updateStatisticDay}
                    updateWeek={this.updateStatisticWeek}
                    updateMonth={this.updateStatisticMonth}
                    updateYear={this.updateStatisticYear}
                  />
                )}
              />
              <Route
                path="/Schedule"
                render={() => (
                  <Schedule
                    thermostats={this.state.thermostats}
                    schedule_cur_thermo_id={this.state.schedule_cur_thermo_id}
                    onThermoStatusChange={this.onThermoStatusChange}
                    onThermoModeChange={this.onThermoModeChange}
                    onThermoScheduleChange={this.onThermoScheduleChange}
                  />
                )}
              />
            </Switch>
          </section>
          <button onClick={this.checkState}>SEE STATE(debug only)</button>
        </div>
      </Router>
    );
  }
}

App.defaultProps = {
  day: {
    sTemps: [0],
    cTemps: [0],
    oTemps: [0]
  }
};

export default App;
