import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./Navbar";
import Home from "../home/Home";
import Login from "../login/Login";
import Thermostats from "../user/thermostats/Thermostats";
import Schedule from "../user/schedule/Schedule";
import Statistics from "../user/statistics/Stats";
import BadLogin from "../user/badlogin/BadLogin";
import axios from "axios";

/**
 * App class
 * -Contains the route to all other pages
 * -Contains api calls for the 
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReceived: false,
      thermostats: [
        {
          id: 1,
          status: false,
          setTemp: 4,
          currentTemp: 30
        }
      ],
      schedule_cur_thermo_id: 0,
      isThermoSelected: false
    };
  }

  set_schedule_cur_thermo_id = selected_thermostat => {
    this.setState({
      schedule_cur_thermo_id: selected_thermostat,
      isThermoSelected: true
    });
  };

  /**
   * updateThermostat
   * -Gets the list of thermostats from the backend and populate them to the state
   */
  updateThermostat = async () => {
    try {
      let host =
        process.env.NODE_ENV === "production"
          ? "https://hsweeth-backend.herokuapp.com"
          : "http://localhost:3000";

      let { data } = await axios.get(host + "/api/thermostat/all", {
        headers: {
          "x-auth-token": window.localStorage.token
        }
      });
      this.setState({ thermostats: data.thermostats, dataReceived: true });
    } catch (e) {}
  };

  /**
   * onThermoStatusChange
   * Input: status
   *          -the status of the selected thermostat
   *        thermostat_index
   *          -the index selected corresponding to the array of thermostats in the state
   * -Sets the state with a new selected thermostat via its index
   */
  onThermoStatusChange = (status, thermostat_index) => {
    const { thermostats } = { ...this.state };
    const newState = thermostats;
    newState[thermostat_index].status = status;
    this.setState({ thermostats: newState });
  };

  /**
   * onThermoModeChange
   * Input: mode
   *          -the mode of the selected thermostat
   *        thermostat_index
   *          -the index selected corresponding to the array of thermostats in the state
   * -Sets the mode with a new selected thermostat via its index
   */
  onThermoModeChange = (mode, thermostat_index) => {
    const { thermostats } = { ...this.state };
    const newThermostats = thermostats;
    newThermostats[thermostat_index].mode = parseInt(mode);
    this.setState({ thermostats: newThermostats });
  };

  /**
   * onThermoScheduleChange
   * Input: val
   *          -the new temperature setting value
   *        thermostat_index
   *          -the index selected corresponding to the array of thermostats in the state
   *        day
   *          -the specific day of the week of the schedule that is being changed
   *        hour_index
   *          -the specific hour of the day of the schedule that is being changed
   * -Sets the thermostat schedule for a particular day at the particular hour
   */
  onThermoScheduleChange = (val, thermostat_index, day, hour_index) => {
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

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <section className="margin-space">
            <Switch>
              <Route exact path="/" component={Home} />
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
                  <Statistics thermostats={this.state.thermostats} />
                )}
              />
              <Route
                path="/Schedule"
                render={() => (
                  <Schedule
                    thermostats={this.state.thermostats}
                    set_schedule_cur_thermo_id={this.set_schedule_cur_thermo_id}
                    schedule_cur_thermo_id={this.state.schedule_cur_thermo_id}
                    onThermoStatusChange={this.onThermoStatusChange}
                    onThermoModeChange={this.onThermoModeChange}
                    onThermoScheduleChange={this.onThermoScheduleChange}
                  />
                )}
              />
              <Route
                path="/BadLogin"
                render={routeProps => <BadLogin {...routeProps} />}
              />
            </Switch>
          </section>
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
