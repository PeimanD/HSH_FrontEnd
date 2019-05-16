import React, { Component } from "react";
import Grid from "@material-ui/core/Grid/index";
import { withStyles } from "@material-ui/core/styles";
import { Combobox } from "react-widgets";
import TemperatureSlider from "./TemperatureSlider";
import Button from "@material-ui/core/Button";
import "./sliderContainer.css";

const styles = {
  root: {
    background: "orange",
    borderRadius: 3,
    border: 0,
    color: "white"
  }
};

const tempRange = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30
];

class SliderContainer extends Component {
  state = {
    tempTemp: 20
  };

  populateSliders = () => {
    let sliders = [];
    for (let i = 0; i < 24; ++i) {
      let time = i + ":00";
      sliders.push(
        <div key={"div-" + this.props.weekDay + i}>
          <p>{time}</p>
          <TemperatureSlider
            key={"tempSlider" + i}
            setTemp={this.props.setTemp ? this.props.setTemp[i] : 20}
            setParent={this.setTempState}
            index={i}
          />
        </div>
      );
    }
    return (
      <div className="sliderContainer-midContainer">
        <div className="sliderContainer-innerContainer">{sliders}</div>
      </div>
    );
  };

  resetSliders = () => {
    let { schedule_cur_thermo_id, weekDay } = this.props;
    for (let i = 0; i < 24; ++i) {
      console.log("SETALL CALLED, handleSetSingleSlider");
      this.props.handleSetSingleSlider(
        schedule_cur_thermo_id,
        weekDay,
        i,
        this.state.tempTemp
      );
    }
  };

  /**
   * Sets the SetAll value
   */
  setResetTemp = value => {
    if (Number.isInteger(value)) {
      this.setState({ tempTemp: value });
    }
  };

  setTempState = (index, value) => {
    let { schedule_cur_thermo_id, weekDay } = this.props;
    this.props.handleSetSingleSlider(
      schedule_cur_thermo_id,
      weekDay,
      index,
      value
    );
  };

  render() {
    const { classes } = this.props;
    let sliderList = this.populateSliders();

    return (
      <div className="sliderContainer-outerContainer">
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Combobox
              data={tempRange}
              defaultValue={20}
              onChange={value => {
                this.setResetTemp(value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button className={classes.root} onClick={this.resetSliders}>
              Set All
            </Button>
          </Grid>
          {sliderList}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SliderContainer);
