import React, { Component } from 'react';
import { Combobox } from 'react-widgets';
import Graph from './Graph';
import Grid from '@material-ui/core/Grid';

import 'react-widgets/dist/css/react-widgets.css';
import './graph.css';
import SideNav from "../SideNav";

class Stats extends Component {
    state = {
        graphType: 'Day',
        currentThermostat: 'Thermostat #1',
    }

    changeDisplay = (type) => {
        this.setState({ graphType: type });
    }

    render() {
        let graphOptions = ["Day", "Week", "Month", "Year"];
        let thermostats = ["Thermostat #1", "Thermostat #2", "Thermostat #3", "Thermostat #4"];
        return (
            <div className="graph-outer-container">
                {/* drop down menu component to pick between day, week, month, year */}
                <SideNav />
                <div className="graph-combobox">
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Combobox
                                data={graphOptions}
                                defaultValue={'Day'}
                                onChange={value => {
                                    this.setState({ graphType: value });
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Combobox
                                data={thermostats}
                                defaultValue={this.state.currentThermostat}
                                onChange={value => {
                                    this.setState({ graphType: this.state.graphType, currentThermostat: value });
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="graph-mid-container card">
                    <Graph graphType={this.state.graphType} currentThermostat={this.state.currentThermostat} />
                </div>
            </div>
        );
    }
}

export default Stats;