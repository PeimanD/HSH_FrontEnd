import React, { Component } from "react";
import Slider from "@material-ui/lab/Slider";

import { withStyles } from "@material-ui/core/styles";

const maxTemp = 30;
const minTemp = 0;

const styles = {
  root: {
    display: "flex",
    height: "50vh"
  },
  slider: {
    padding: "0 25px",
  },
  track: {
    backgroundColor: "orange"
  },
  thumb: {
    backgroundColor: "green"
  },
  label: {
    margin: "auto",
    height: "20px"
  },
  overContainer: {
    height: "58vw"
  }
};

/**
 * TemperatureSlider class
 * -Contains a single slider with button to zero it.
 * -Also contains the label delinating what the slider value is.
 */
class TemperatureSlider extends Component {

  /**
   * handleChange
   * Input: value
   *          -the value of the slider
   * Updates the parent component on slider value changes
   */
  handleChange = (event, value) => {
    this.props.setParent(this.props.index, value);
  };

  /**
   * resetZero
   * -Sets the slider value to zero
   */
  resetZero = () => {
    this.props.setParent(this.props.index, 0);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.overContainer}>
        <div className={classes.root}>
          <Slider
            classes={{
              container: classes.slider,
              track: classes.track,
              thumb: classes.thumb
            }}
            max={maxTemp}
            min={minTemp}
            value={this.props.setTemp}
            onChange={this.handleChange}
            step={1}
            vertical
          />
        </div>
        <div className={classes.label}>
          <p>{this.props.setTemp + "\xB0C"}</p>
          <button size="small" onClick={this.resetZero}>
            Zero
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TemperatureSlider);
