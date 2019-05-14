import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import NavBar from './Navbar';
import Home from '../home/Home'
import Login from '../login/Login';
import Thermostats from "../user/thermostats/Thermostats";
import Schedule from "../user/schedule/Schedule";
import Statistics from "../user/statistics/Stats";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReceived: false,
            thermostats: [],
            day: {
                sTemps: [0],
                cTemps: [0],
                oTemps: [0],
            },
            week: null,
            month: null,
            year: null,
            firstLoad: true,
        };
    };

    componentDidMount() {
        let host = "http://localhost:3000";
        try {

        } catch (e) {
        }
    };

    updateThermostat = async () => {
        try {
            let host = "http://localhost:3000";
            let {data} = await axios.get(host + "/api/thermostat/all", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                }
            });
            this.setState({thermostats: data.thermostats, dataReceived: true});
            console.log("app updateThermostat:");
            console.log(this.state.thermostats);
        } catch (e) {

        }
    }

    updateStatisticDay = async (thermostatId, masterDevId) => {
        try {
            let host = "http://localhost:3000";
            let {data} = await axios.get(host + "/api/log/day", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                },
                params: {
                    master_id: 'ree',
                    thermostat_id: 'pre-ree',
                    day: 8,
                    month: 5,
                    year: 2019
                }
            });

            console.log("got data:", data);
            this.setState({day: data, firstLoad: false});

        } catch (e) {

        }
    }

    updateStatisticWeek = async (thermostatId, masterDevId) => {
        try {
            let host = "http://localhost:3000";
            let {data} = await axios.get(host + "/api/log/week", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                },
                params: {
                    master_id: 'ree',
                    thermostat_id: 'pre-ree',
                    day: 8,
                    month: 5,
                    year: 2019
                }
            });
            this.setState({week: data});

        } catch (e) {

        }
    }

    updateStatisticMonth = async (thermostatId, masterDevId) => {
        try {
            let host = "http://localhost:3000";
            let {data} = await axios.get(host + "/api/log/month", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                },
                params: {
                    master_id: 'ree',
                    thermostat_id: 'pre-ree',
                    month: 5,
                    year: 2019
                }
            });
            this.setState({month: data});

        } catch (e) {

        }
    }

    updateStatisticYear = async (thermostatId, masterDevId) => {
        try {
            let host = "http://localhost:3000";
            let {data} = axios.get(host + "/api/log/year", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                },
                params: {
                    master_id: 'ree',
                    thermostat_id: 'pre-ree',
                    year: 2019
                }
            });
            this.setState({year: data});

        } catch (e) {

        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar/>
                    <section className="margin-space">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            {/* <Route path="/login" component={Login}/> */}
                            <Route path="/login"
                                   render={(routeProps) => <Login
                                       {...routeProps}  />}/>
                            <Route path="/Thermostats"
                                   render={() =>
                                       <Thermostats
                                           update={this.updateThermostat}
                                           thermostats={this.state.thermostats}
                                           dataReceived={this.state.dataReceived}/>}/>
                            <Route path="/Statistics"
                                   render={() => <Statistics
                                       day={this.state.day}
                                       week={this.state.week}
                                       month={this.state.month}
                                       year={this.state.year}
                                       thermostats={this.state.thermostats}
                                       firstLoad={this.state.firstLoad}
                                       updateDay={this.updateStatisticDay}
                                       updateWeek={this.updateStatisticWeek}
                                       updateMonth={this.updateStatisticMonth}
                                       updateYear={this.updateStatisticYear}/>}/>

                            <Route path="/Schedule"
                                   render={() => <Schedule/>}/>
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
        oTemps: [0],
    },
}

export default App;
