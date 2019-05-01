import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import MyNavBar from './MyNavBar.jsx';
import MainPageHeader from './MainPageHeader.jsx';
import MainPageBody from './MainPageBody.jsx';
import Login from './Login';
import MyFooter from './MyFooter';
import UserPage from './UserPage';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <MyNavBar />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/userpage" component={UserPage}/> 
          </Switch>
        </div>
      </Router>
    );
  }
}

function Index() {
  return (
    <header>
      <MainPageHeader/>
      <MainPageBody/>
    </header>
  );
}

export default App;
