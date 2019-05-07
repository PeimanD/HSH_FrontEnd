import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import NavBar from './Navbar';
import Home from '../home/Home'
import Login from '../login/Login';
import Thermostats from "../user/thermostats/Thermostats";
import Statistics from "../user/statistics/Stats";
import Schedule from "../user/schedule/Schedule";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar/>
                    <section className="margin-space">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/Statistics/:graphNum?" component={Statistics}/>
                            <Route path="/Thermostats" component={Thermostats}/>
                            <Route path="/Schedule" component={Schedule}/>
                        </Switch>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
