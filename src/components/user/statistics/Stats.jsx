import React, {Component} from 'react';
import {Combobox} from 'react-widgets';
import Graph from './Graph';
import Grid from '@material-ui/core/Grid';

import 'react-widgets/dist/css/react-widgets.css';
import './graph.css';
import SideNav from "../SideNav";
import BadLogin from "../badlogin/badLogin";

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphType: 'Day',
            currentThermostat: 'Thermostat #1',
        };
    };

    componentDidMount() {
        this.setState({currentThermostat: this.props.currentThermostat});
    }

    changeDisplay = (type) => {
        this.setState({graphType: type});
    };

    changeThermostat = (thermostat) => {
        this.setState({currentThermostat: thermostat});
    };

    render() {
        if (!(window.localStorage.token)) {
            return (
                <BadLogin/>
            );
        }

        let graphOptions = ["Day", "Week", "Month", "Year"];
        let thermostats = ["Thermostat #1", "Thermostat #2", "Thermostat #3", "Thermostat #4"];
        return (
            <div className="graph-outer-container">
                {/* drop down menu component to pick between day, week, month, year */}
                <SideNav/>
                <div className="graph-combobox">
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Combobox
                                data={graphOptions}
                                defaultValue={'Day'}
                                onChange={value => {
                                    this.setState({graphType: value});
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Combobox
                                data={thermostats}
                                defaultValue={this.state.currentThermostat}
                                onChange={value => {
                                    this.setState({graphType: this.state.graphType, currentThermostat: value});
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="graph-mid-container card">
                    <Graph graphType={this.state.graphType} currentThermostat={this.state.currentThermostat}/>
                </div>
            </div>
        );
    }
}

export default Stats;