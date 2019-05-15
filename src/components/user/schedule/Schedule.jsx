import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SideNav from "../SideNav";
import SliderContainer from "./SliderContainer";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import Grid from "@material-ui/core/Grid";

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
    width: "60vw",
    marginLeft: "27vw"
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
  }
});

class Schedule extends React.Component {
  state = {
    value: 0,
    mode: 0,
    status: true,
    setTemp: [
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20
    ]
  };

  componentDidMount = () => {
    console.log(
      this.props
      // this.props.thermostats[this.props.schedule_cur_thermo_id]["weekSchedule"]
    );
    this.setState(
      {
        setTemp: this.props.thermostats[this.props.schedule_cur_thermo_id][
          "weekSchedule"
        ]
      },
      () => {
        console.log(this.state.setTemp);
      }
    );
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleStatusChange = () => event => {
    let {
      thermostats,
      onThermoStatusChange,
      schedule_cur_thermo_id
    } = this.props;
    let status = !thermostats[schedule_cur_thermo_id].status;
    onThermoStatusChange(status, schedule_cur_thermo_id);
    // handle the big on/off state change
    // console.log("schedule:handlestatus change clicked: ", this.props);
    // this.setState({ status: event.target.checked });
  };

  handleModeChange = event => {
    let { schedule_cur_thermo_id, onThermoModeChange } = this.props;
    onThermoModeChange(event.target.value, schedule_cur_thermo_id);
  };

  render() {
    const { classes, theme, thermostats, schedule_cur_thermo_id } = this.props;
    const modeStrings = ["Manual", "Schedule", "Smart"];
    return (
      <div>
        <SideNav />
        <div className={classes.root}>
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
                      this.props.thermostats[this.props.schedule_cur_thermo_id]
                        .status
                    }
                    onChange={this.handleStatusChange()}
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
            <Tabs
              value={this.state.value}
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
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["mon"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["tue"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["wed"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["thu"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["fri"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["sat"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <SliderContainer
                schedule_cur_thermo_id={this.props.schedule_cur_thermo_id}
                setTemp={
                  this.state.setTemp
                    ? this.state.setTemp["sun"]
                    : this.state.setTemp
                }
              />
            </TabContainer>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Schedule);
