import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const maxTemp = 30;
const minTemp = 0;

const styles = {
    root: {
        height: '20vw',
    },
    slider: {
        padding: '0 25px',
    },
    track: {
        backgroundColor: 'orange',
    },
    thumb: {
        backgroundColor: 'green',
    },
    label: {
        margin: 'auto',
        height: '20px',
    },
    overContainer: {
        height: '28vw',
    },
};

class TemperatureSlider extends Component {
    state = {
        key: '',
        setTemp: 0,
    }

    componentDidMount() {
        this.setState({ index: this.props.key, setTemp: this.props.setTemp });
    }

    handleChange = (event, value) => {
        this.setState({ setTemp: value });
    };

    resetZero = () => {
        this.setState({ setTemp: 0 });
    }

    componentDidUpdate() {
        if (this.props.setTemp !== this.state.setTemp) {
            this.setState({ setTemp: this.props.setTemp });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.overContainer}>
                <div className={classes.root}>
                    <Slider
                        classes={{ container: classes.slider, track: classes.track, thumb: classes.thumb }}
                        max={maxTemp}
                        min={minTemp}
                        value={this.state.setTemp}
                        onChange={this.handleChange}
                        step={1}
                        vertical
                    />
                </div>
                <div className={classes.label}>
                    <p>{this.state.setTemp + "\xB0C"}</p>
                    <button size="small" onClick={this.resetZero}>
                        Zero
                    </button>
                </div>
            </div>
        );
    };
}

export default withStyles(styles)(TemperatureSlider);