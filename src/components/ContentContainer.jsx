import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Stats from "./Stats";
import ThermoCardContainer from "./ThermoCardContainer";
import SliderContainer from "./SliderContainer";

import "./css/content.css";

class ContentContainer extends Component {
  render() {
    return (
      <div className="d-flex flex-grow-1 content-background">
        <Switch>
          <Route exact path="/thermoCards" component={ThermoCardContainer} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/settings" component={SliderContainer} />
        </Switch>
      </div>
    );
  }
}

export default ContentContainer;