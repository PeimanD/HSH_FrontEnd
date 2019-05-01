import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Stats from "./Stats";
import ThermoCardContainer from "./ThermoCardContainer";

class ContentContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/thermoCards" component={ThermoCardContainer} />
          <Route exact path="/stats" component={Stats} />
        </Switch>
      </div>
    );
  }
}

export default ContentContainer;