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
            dataReceived: false,
            thermostats: null, //move this to app
        };
    };

    async componentDidMount() {
        let host = "http://localhost:3000";
        try {
            const {data} = await axios.get(host + "/api/thermostat", {
                headers: {
                    "x-auth-token": window.localStorage.token,
                }
            }).then(({data}) => {
                let thermostats = data.thermostats;
                this.setState({thermostats: thermostats, dataReceived: true})
            });
        } catch (e) {
        }
    };

    renderThermostats = () => {
        let thermostats = [];
        for (let i = 0; i < this.state.thermostats.length; ++i) {
            let status = this.state.thermostats[i].status;
            let setTemp = this.state.thermostats[i].setTemp;
            thermostats.push(
                <Grid item xs={6} key={i}>
                    <Thermostat
                        id={i}
                        status={status}
                        setTemp={setTemp}
                        currentTemp={30}
                    />
                </Grid>
            );
        }
        return thermostats;
    };

    render() {
        const {classes} = this.props;
        if (!(window.localStorage.token)) {
            return (
                <BadLogin/>
            );
        }

        return (
            <div>
                <SideNav/>
                <div className={classes.root}>
                    {this.state.dataReceived ?
                        <Paper className={classes.paper}>
                            <Grid container spacing={8}>
                                {this.renderThermostats()}
                            </Grid>
                        </Paper> : ''}
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