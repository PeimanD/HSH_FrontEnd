import React, { Component } from 'react';

import TemperatureSlider from './TemperatureSlider';
import './css/sliderContainer.css';

class SliderContainer extends Component {
    state = {
        drawer: 'Mon',
        setTemps: {
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: [],
        },
    }

    setTemperatures = () => {
        //axio get the temperature schedule
    }

    populateSliders = () => {
        let sliders = [];
        for (let i = 0; i < 24; ++i) {
            let time = i + ":00";
            sliders.push(
                <div>
                    <p>{time}</p>
                    <TemperatureSlider key={this.state.drawer + i} setTemp={20} />
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

    render() {
        const { classes } = this.props;
        let sliderList = this.populateSliders();

        return (
            <div className="sliderContainer-outerContainer">
                {sliderList}
            </div>
        )
    }
}

export default SliderContainer;