import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const maxTemp = 30;
const minTemp = 0;

const styles = {
    root: {
        display: 'flex',
        height: 300,
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
        padding: '10px 0 0 0',
        margin: 'auto',
        height: '50px',
    },
    overContainer: {
        paddingTop: '20px',
        height: 370,
    },
};

class TemperatureSlider extends Component {
    state = {
        key: '',
        setTemp: 0,
    }

    componentDidMount() {
        this.setState({index: this.props.key, setTemp: this.props.setTemp});
    }

    handleChange = (event, value) => {
        this.setState({ setTemp: value });
    };

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
                <Typography className={classes.label}>{this.state.setTemp}</Typography>
            </div>
        );
    };
}

export default withStyles(styles)(TemperatureSlider);