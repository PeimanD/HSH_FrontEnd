import React, { Component } from 'react';
import { Combobox } from 'react-widgets';
import Graph from './Graph';
import Grid from '@material-ui/core/Grid';

import 'react-widgets/dist/css/react-widgets.css';
import './saving.css';
import SideNav from "../SideNav";

class Saving extends Component {
    render() {
        // let {match: {params}} = this.props;
        let graphOptions = ["Day", "Week", "Month", "Year"];
        return (
            <div className="graph-outer-container">
                {/* drop down menu component to pick between day, week, month, year */}
                <SideNav />
            </div>
        )
    }
}

export default Saving;