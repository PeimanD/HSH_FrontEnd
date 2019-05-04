import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Stats from "./statistics/Stats";
import ThermoCardContainer from "./thermostats/ThermoCardContainer";

import "./content.css";

class ContentContainer extends Component {
  render() {
    return (
      <div className="d-flex flex-grow-1 content-background">
        <Switch>
          <Route exact path="/thermoCards" component={ThermoCardContainer} />
          <Route exact path="/stats" component={Stats} />
        </Switch>
      </div>
    );
  }
}

export default ContentContainer;