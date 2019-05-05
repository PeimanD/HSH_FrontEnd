import React, { Component } from 'react';
import { Combobox } from 'react-widgets';
import Graph from './Graph';

import 'react-widgets/dist/css/react-widgets.css';
import './graph.css';
import SideNav from "../SideNav";

class Stats extends Component {
    state = {
        graphType: 'Day',
    }

    changeDisplay = (type) => {
        this.setState({ graphType: type });
    }

    render() {
        let graphOptions = ["Day", "Week", "Month", "Year"];
        return (
            <div className="graph-outer-container">
                {/* drop down menu component to pick between day, week, month, year */}
                <SideNav/>
                <div className="graph-combobox">
                    <Combobox
                        data={graphOptions}
                        defaultValue={'Day'}
                        onChange={value => {
                            this.setState({ graphType: value });
                        }}
                    />
                </div>
                <div className="graph-mid-container card">
                    <Graph graphType={this.state.graphType} />
                </div>
            </div>
        );
    }
}

export default Stats;