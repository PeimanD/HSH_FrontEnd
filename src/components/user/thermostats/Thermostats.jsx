import axios from "axios/index";
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid/index';
import ThermoCard from "./ThermoCard.jsx";
import SideNav from '../SideNav'

class ThermoCardContainer extends Component {
    state = {
        user: null
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
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center">
                    <Grid item xs={6}>
                        <ThermoCard/>
                    </Grid>
                    <Grid item xs={6}>
                        <ThermoCard/>
                    </Grid>
                    <Grid item xs={6}>
                        <ThermoCard/>
                    </Grid>
                    <Grid item xs={6}>
                        <ThermoCard/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ThermoCardContainer;