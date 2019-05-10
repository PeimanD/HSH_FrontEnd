import axios from "axios/index";
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid/index';
import Thermostat from "./Thermostat.jsx";
import SideNav from '../SideNav'
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import BadLogin from "../badlogin/badLogin";

class Thermostats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            token: ''
        };
    };

    async componentWillMount() {
        let host = "http://localhost:3000";
        try {
            const {data} = await axios.get(host + "/api/thermostat", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                }
            });

            console.log(data);
            for (let i = 0; i < data.length; ++i) {
                let tempData = {
                    "thermostatId": data[i].thermostatId,
                    "masterDevId": data[i].masterDevId,
                }
            }
        } catch (e) {
        }
    };

    render() {
        const {classes} = this.props;
        // check localStorage for the token, if no token return a div telling the user to log in
        if (!(window.localStorage.token)) {
            return (
                <BadLogin/>
            );
        }

        return (
            <div>
                <SideNav/>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={8}>
                            <Grid item xs={6}>
                                <Thermostat
                                    id={1}
                                    status={true}
                                    mode={true}
                                    setTemp={20}
                                    currentTemp={30}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Thermostat
                                    id={2}
                                    status={true}
                                    mode={true}
                                    setTemp={20}
                                    currentTemp={30}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Thermostat
                                    id={3}
                                    status={false}
                                    mode={true}
                                    setTemp={20}
                                    currentTemp={30}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Thermostat
                                    id={4}
                                    status={false}
                                    mode={true}
                                    setTemp={20}
                                    currentTemp={30}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
        );
    }
}

const styles = {
    root: {
        marginLeft: '240px'
    },
    paper: {
        height: '50%',
        width: '80%',
        marginTop: '10%',
        marginRight: '10%',
        marginLeft: '10%',
        borderRadius: '15px',
        textAlign: 'center',
    },
};

Thermostats.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Thermostats);