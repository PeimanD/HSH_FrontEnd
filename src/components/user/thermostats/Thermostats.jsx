import React, { Component } from "react";
import Grid from "@material-ui/core/Grid/index";
import Thermostat from "./Thermostat.jsx";
import SideNav from "../SideNav";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import BadLogin from "../badlogin/badLogin";

class Thermostats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReceived: this.props.dataReceived
    };
  }

  componentDidMount = async () => {
    await this.props.update();
  };

  render() {
    const { classes } = this.props;
    if (!window.localStorage.token) {
      return <BadLogin />;
    }
    let renderedThermostats = this.props.thermostats.map((thermo, i) => {
      return (
        <Grid item xs={6} key={i}>
          <Thermostat
            id={i}
            status={thermo.status}
            setTemp={thermo.setTemp}
            currentTemp={30}
            thermostatId={thermo.thermostatId}
            masterDevId={thermo.masterDevId}
            set_schedule_cur_thermo_id={this.props.set_schedule_cur_thermo_id}
          />
        </Grid>
      );
    });

    return (
      <div>
        <SideNav />
        <div className={classes.root}>
          {this.props.dataReceived ? (
            <Paper className={classes.paper}>
              <Grid container spacing={8}>
                {renderedThermostats}
              </Grid>
            </Paper>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    marginLeft: "240px"
  },
  paper: {
    height: "50%",
    width: "80%",
    marginTop: "10%",
    marginRight: "10%",
    marginLeft: "10%",
    borderRadius: "15px",
    textAlign: "center"
  }
};

Thermostats.propTypes = {
  classes: PropTypes.object.isRequired,
  thermostats: PropTypes.array.isRequired
};

Thermostats.defaultProps = {
  dataReceived: false,
  thermostats: [
    {
      id: 1,
      status: false,
      setTemp: 4,
      currentTemp: 30
    }
  ]
};

export default withStyles(styles)(Thermostats);
