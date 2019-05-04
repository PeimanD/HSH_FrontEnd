import axios from "axios/index";
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid/index';
import Thermostat from "./Thermostat.jsx";
import SideNav from '../SideNav'

class Thermostats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    };

    async componentWillMount() {
        let host = "http://localhost:3000";
        const {data} = await axios.get(host + "/api/users/me");
        this.setState({user: data.user});
    };

    render() {
        return (
            <div>
                <SideNav/>
                <Grid container>
                    <Grid item xs={6}><Thermostat/></Grid>
                    <Grid item xs={6}><Thermostat/></Grid>
                    <Grid item xs={6}><Thermostat/></Grid>
                    <Grid item xs={6}><Thermostat/></Grid>
                </Grid>
            </div>
        );
    }
}

export default Thermostats;