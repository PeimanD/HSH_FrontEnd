import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import NavBar from './Navbar';
import Home from '../home/Home'
import Login from '../login/Login';
import Thermostats from "../user/thermostats/Thermostats";
import Schedule from "../user/schedule/Schedule";
import Statistics from "../user/statistics/Stats";
import axios from "axios";

import { ApplicationProvider, ApplicationConsumer } from '../context/ThermostatContext';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReceived: false,
            thermostats: null,
            day: null,
            week: null,
            month: null,
            year: null,
        };
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        let host = "http://localhost:3000";
        if (!this.state.dataReceived) {
            const { thermostats } = axios.get(host + "/api/thermostat/all", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                }
            }).then(({ data }) => {
                let thermostats = data.thermostats;
                this.setState({ thermostats: thermostats, dataReceived: true });
            });
        }
    }

    componentDidMount() {
        let host = "http://localhost:3000";
        // if (!(window.localStorage.token)) {
        //     return;
        //     // window.location.replace("./login");
        // }
        // try {


        const getDay = () => {
            axios.get(host + "/api/log/day", {
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
            }).then(({ data }) => {
                this.setState({ day: data });
            })
        };

        const getWeek = () => {
            axios.get(host + "/api/log/week", {
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
            }).then(({ data }) => {
                this.setState({ week: data });
            })
        };

        const getMonth = () => {
            axios.get(host + "/api/log/month", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                },
                params: {
                    master_id: 'ree',
                    thermostat_id: 'pre-ree',
                    month: 5,
                    year: 2019
                }
            }).then(({ data }) => {
                this.setState({ month: data });
            })
        };

        const getYear = () => {
            axios.get(host + "/api/log/year", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                },
                params: {
                    master_id: 'ree',
                    thermostat_id: 'pre-ree',
                    year: 2019
                }
            }).then(({ data }) => {
                this.setState({ year: data });
            })
        };
        //} 
        // catch (e) {
        // }
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar />
                    <ApplicationProvider>
                        <section className="margin-space">
                        <Switch>
                            {/* {(this.state.dataReceived ? <Route exact path="/" component={Home} /> : <Route exact path="/" component={Login} />)} */}
                            <Route exact path="/" component={Home} />
                            <ApplicationConsumer>
                                { (consumerProps) => (
                                    <Route 
                                        path="/login"
                                        render={consumerProps => <Login {...consumerProps} />}
                                    />
                                )}
                            </ApplicationConsumer>
                            <Route path="/Thermostats"
                                render={() => <Thermostats thermostats={this.state.thermostats}
                                    dataReceived={this.state.dataReceived} />} />
                            <Route path="/Statistics"
                                render={() => <Statistics day={this.state.day}
                                    week={this.state.week}
                                    month={this.state.month}
                                    year={this.state.year}
                                    thermostats={this.state.thermostats} />} />

                            <Route path="/Schedule"
                                render={() => <Schedule />} />
                        </Switch>
                    </section>
                    </ApplicationProvider>
                </div>
            </Router>
        );
    }
}

export default App;
