import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';

import NavBar from '../finished/Navbar';
import Header from '../finished/Header';
import Body from '../home/Body';
import Login from '../login/Login';
import UserPage from '../user/UserPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar/>
                    <section className="margin-space">
                        <Switch>
                            <Route exact path="/" component={Index}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/userpage" component={UserPage}/>
                        </Switch>
                    </section>
                </div>
            </Router>
        );
    }
}

function Index() {
    return (
        <header>
            <Header/>
            <Body/>
        </header>
    );
}

export default App;
