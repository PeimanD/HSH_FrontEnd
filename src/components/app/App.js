import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import NavBar from './Navbar';
import Home from '../home/Home'
import Login from '../login/Login';
import Thermostats from "../user/thermostats/Thermostats";
import Statistics from "../user/statistics/Stats";
import Schedule from "../user/schedule/Schedule";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReceived: false,
            thermostats: null,
        };
    };

    async componentDidMount() {
        let host = "http://localhost:3000";
        try {
            const {data} = await axios.get(host + "/api/thermostat", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                }
            }).then(({data}) => {
                let thermostats = data.thermostats;
                this.setState({thermostats: thermostats, dataReceived: true})
            });
        } catch (e) {
        }
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar/>
                    <section className="margin-space">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/Thermostats"
                                   render={() => <Thermostats thermostats={this.state.thermostats}
                                                              dataReceived={this.state.dataReceived}/>}/>
                            <Route path="/Statistics" component={Statistics}/>
                            <Route path="/Schedule" component={Schedule}/>
                        </Switch>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
