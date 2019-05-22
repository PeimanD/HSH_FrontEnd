import React from "react";
import { DropdownList } from "react-widgets";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SideNav from "../SideNav";
import SliderContainer from "./SliderContainer";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import axios from "axios";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: "18vw",
    marginRight: "3vw"
  },
  colorSwitchBase: {
    "&$colorChecked": {
      color: "orange",
      "& + $colorBar": {
        backgroundColor: "orange"
      }
    }
  },
  colorChecked: {
    color: "orange"
  },
  colorBar: {
    color: "orange"
  },
  saveButton: {
    background: "orange",
    borderRadius: 3,
    margin: "0.5em 0",
    border: 0,
    color: "white"
  },
  dropDown: {
    width: "20vw"
  },
  flexTab: {
    display: "flex",
    justifyContent: "center"
  }
});

/**
 * Schedule class
 * -Upper level component that contains all the SliderContainers to set the thermostat schedule for each day of the week
 */
class Schedule extends React.Component {
  state = {
    dayIndex: 0
  };

  /**
   * Event callback to when user changes day tabs
   */
  handleChange = (event, dayIndex) => {
    this.setState({ dayIndex });
  };

  /**
   * Event callback to when user changes the status of the thermostat
   *    Calls the given prop callback function so that the component state residing in App.js is changed
   */
  handleStatusChange = event => {
    let {
      thermostats,
      onThermoStatusChange,
      schedule_cur_thermo_id
    } = this.props;
    let status = !thermostats[schedule_cur_thermo_id].status;
    onThermoStatusChange(status, schedule_cur_thermo_id);
  };

  /**
   * Event callback to when user changes the mode of the thermostat
   *    Calls the given prop callback function so that the component state residing in App.js is changed
   */
  handleModeChange = event => {
    let { schedule_cur_thermo_id, onThermoModeChange } = this.props;
    onThermoModeChange(event.target.value, schedule_cur_thermo_id);
  };

  /**
   * Event callback to when user changes the temperature for each slider
   *    Calls the given prop callback function from App.js so that the schedule residing in App.js is changed
   *    Passed down to child component (Each individual slider) so each slider can change the state in App.js
   */
  handleSetSingleSlider = (thermoIdx, weekDay, hourIdx, value) => {
    this.props.onThermoScheduleChange(value, thermoIdx, weekDay, hourIdx);
  };

  /**
   * Calls the API call to save the current schedule in App.js to MongoAtlas
   */
  handleSaveSchedule = async () => {
    let { thermostats, schedule_cur_thermo_id } = this.props;
    let { weekSchedule, thermostatId, masterDevId, mode, status } = thermostats[
      schedule_cur_thermo_id
    ];

    let hRoot =
      process.env.NODE_ENV === "production"
        ? "https://hsweeth-backend.herokuapp.com"
        : "http://localhost:3000";
    let url = `${hRoot}/api/thermostat/schedule`;
    let data = {
      weekSchedule,
      thermostatId,
      masterDevId,
      mode,
      status
    };
    let options = {
      headers: {
        "x-auth-token": window.localStorage.token
      }
    };
    try {
      let res = await axios.put(url, data, options);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const {
      classes,
      theme,
      thermostats,
      schedule_cur_thermo_id,
      set_schedule_cur_thermo_id
    } = this.props;
    const modeStrings = ["Manual", "Schedule", "Smart"];
    const dayStringIndexes = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    if (
      thermostats === undefined ||
      schedule_cur_thermo_id === undefined ||
      thermostats[schedule_cur_thermo_id] === undefined ||
      thermostats[0].id === 1
    ) {
      window.location.replace("/Thermostats");
    } else {
      let thermoNames = thermostats.map((thermo, idx) => {
        return { id: idx, roomName: thermo.roomName };
      });
      let dayTabs = dayStringIndexes.map((str, idx) => {
        return (
          <TabContainer
            key={`dayTabs${idx}`}
            dir={theme.direction}
            className={classes.flexTab}
          >
            <SliderContainer
              weekDay={str}
              schedule_cur_thermo_id={schedule_cur_thermo_id}
              setTemp={thermostats[schedule_cur_thermo_id].weekSchedule[str]}
              handleSetSingleSlider={this.handleSetSingleSlider}
            />
          </TabContainer>
        );
      });
      console.log("default", thermoNames[schedule_cur_thermo_id].roomName);
      return (
        <div>
          <SideNav />
          <div className={classes.root}>
            <Toolbar disableGutters>
              <DropdownList
                className={classes.dropDown}
                data={thermoNames}
                valueField="id"
                textField="roomName"
                defaultValue={thermoNames[schedule_cur_thermo_id].roomName}
                onChange={val => {
                  set_schedule_cur_thermo_id(val.id);
                }}
              />
            </Toolbar>
            <Grid container justify="space-between" spacing={24}>
              <Grid
                style={{ display: "flex" }}
                container
                justify="flex-start"
                item
                xs={12}
                sm={6}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        this.props.thermostats[
                          this.props.schedule_cur_thermo_id
                        ].status
                      }
                      onChange={this.handleStatusChange}
                      classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                        bar: classes.colorBar
                      }}
                    />
                  }
                  label="Status"
                  labelPlacement="start"
                />
              </Grid>
              <Grid
                style={{ display: "flex" }}
                container
                justify="flex-end"
                item
                xs={12}
                sm={6}
              >
                <FormControlLabel
                  control={
                    <RadioGroup
                      aria-label="Mode"
                      name="mode"
                      value={
                        modeStrings[thermostats[schedule_cur_thermo_id].mode]
                      }
                      onChange={this.handleModeChange}
                      row
                    >
                      <FormControlLabel
                        value="Manual"
                        control={<Radio value={0} color="primary" />}
                        label="Manual"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="Schedule"
                        control={<Radio value={1} color="primary" />}
                        label="Schedule"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="Smart"
                        control={<Radio value={2} color="primary" />}
                        label="Smart"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  }
                />
              </Grid>
            </Grid>
            <AppBar position="static" color="default">
              <div className={classes.flexTab}>
                <Tabs
                  value={this.state.dayIndex}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons={"auto"}
                >
                  <Tab label="Monday" />
                  <Tab label="Tuesday" />
                  <Tab label="Wednesday" />
                  <Tab label="Thursday" />
                  <Tab label="Friday" />
                  <Tab label="Saturday" />
                  <Tab label="Sunday" />
                </Tabs>
              </div>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.dayIndex}
            >
              {dayTabs}
            </SwipeableViews>
            <Button
              onClick={this.handleSaveSchedule}
              className={classes.saveButton}
            >
              {`SAVE SCHEDULE`}
            </Button>
          </div>
        </div>
      );
    }
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Schedule);
