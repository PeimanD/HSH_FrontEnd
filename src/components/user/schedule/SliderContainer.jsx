import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import TemperatureSlider from './TemperatureSlider';
import './sliderContainer.css';

class SliderContainer extends Component {
    state = {
        weekDay: 'Mon',
        setTemp: this.props.temperatures
    };

    componentDidMount() {
        this.setTemperatures();
    }

    setTemperatures = () => {
        //axio get the temperature schedule
        //set the weekly temperature
        this.setState({weekDay: this.props.weekDay})
    };

    populateSliders = () => {
        let sliders = [];
        for (let i = 0; i < 24; ++i) {
            let time = i + ":00";
            sliders.push(
                <div key={"div-" + this.state.weekDay + i}>
                    <p>{time}</p>
                    <TemperatureSlider key={this.state.weekDay + i}
                                       setTemp={this.state.setTemp[i]}
                                       onUpdateTemperature={this.props.onUpdateTemperature}
                                       temperatureIndex={this.props.temperatureIndex}
                                       sliderIndex={i}/> {/*20 for now, but will need to be axio get from db*/}
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

    resetSliders = () => event => {
        let temp = [];
        for (let i = 0; i < 24; ++i) {
            temp[i] = event.target.value;
        }
        this.setState({setTemp: temp});
    };

    render() {
        const {classes} = this.props;
        let sliderList = this.populateSliders();

        return (
            <div className="sliderContainer-outerContainer">
                {sliderList}
            </div>
        )
    }
}

export default SliderContainer;