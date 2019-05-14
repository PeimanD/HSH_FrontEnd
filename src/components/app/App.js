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
import { resolve } from 'url';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReceived: false,
            thermostats: [{
                id: 1,
                status: false,
                setTemp: 4,
                currentTemp: 30
            }],
        };
    };

    updateThermostat = async () => {
        try {
            let host = "http://localhost:3000";
            let { data } = await axios.get(host + "/api/thermostat/all", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                }
            });
            this.setState({ thermostats: data.thermostats, dataReceived: true });
        } catch (e) {

        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar />
                    <section className="margin-space">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {/* <Route path="/login" component={Login}/> */}
                            <Route path="/login"
                                render={(routeProps) => <Login
                                    {...routeProps}  />} />
                            <Route path="/Thermostats"
                                render={(routeProps) => <Thermostats
                                    update={this.updateThermostat}
                                    thermostats={this.state.thermostats}
                                    dataReceived={this.state.dataReceived} />} />
                            <Route path="/Statistics"
                                render={() => <Statistics
                                    thermostats={this.state.thermostats} />} />

                            <Route path="/Schedule"
                                render={() => <Schedule />} />
                        </Switch>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
