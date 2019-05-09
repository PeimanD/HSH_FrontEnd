import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Combobox } from 'react-widgets';
import TemperatureSlider from './TemperatureSlider';
import './sliderContainer.css';

const styles = {
    root: {
        width: '100%',
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
};

const tempRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

class SliderContainer extends Component {
    state = {
        weekDay: 'Mon',
        setTemp: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    }

    componentDidMount() {
        this.setTemperatures();
    }

    setTemperatures = async () => {
        //axio get the temperature schedule
        //set the weekly temperature
        this.setState({ weekDay: this.props.weekDay })
    }

    populateSliders = () => {
        let sliders = [];
        for (let i = 0; i < 24; ++i) {
            let time = i + ":00";
            sliders.push(
                <div key={"div-" + this.state.weekDay + i}>
                    <p>{time}</p>
                    <TemperatureSlider key={this.state.weekDay + i} setTemp={this.state.setTemp[i]} /> {/*20 for now, but will need to be axio get from db*/}
                </div>
            ); //will need to get setTemp from database
        }
        return (
            <div className="sliderContainer-midContainer">
                <div className="sliderContainer-innerContainer">
                    {sliders}
                </div>
            </div>
        );
    };

    resetSliders = value => {
        let temp = [];
        for (let i = 0; i < 24; ++i) {
            temp[i] = value;
        }
        this.setState({ setTemp: temp });
    }

    render() {
        const { classes } = this.props;
        let sliderList = this.populateSliders();

        return (
            <div className="sliderContainer-outerContainer">
                <Combobox
                    data={tempRange}
                    defaultValue={20}
                    onChange={ value => {this.resetSliders(value);} }
                />
                {sliderList}
            </div >
        )
    }
}

export default withStyles(styles)(SliderContainer);