import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid/index';
import {withStyles} from '@material-ui/core/styles';
import DropdownList from 'react-widgets/lib/DropdownList'
import {Combobox} from 'react-widgets';
import TemperatureSlider from './TemperatureSlider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './sliderContainer.css';
import {orange} from '@material-ui/core/colors';

const styles = {
    root: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: 'orange',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
};

const tempRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

class SliderContainer extends Component {
    state = {
        weekDay: this.props.weekDay,
        setTemp: this.props.setTemp,
        tempTemp: 20,
    };

    async componentDidMount() {
    }

    populateSliders = () => {
        let sliders = [];
        for (let i = 0; i < 24; ++i) {
            let time = i + ":00";
            sliders.push(
                <div key={"div-" + this.state.weekDay + i}>
                    <p>{time}</p>
                    <TemperatureSlider key={"tempSlider" + i}
                                       setTemp={this.props.setTemp ? this.props.setTemp[i] : 20}
                                       setParent={this.setTempState}
                                       index={i}/> {/*20 for now, but will need to be axio get from db*/}
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

    resetSliders = () => {
        let temp = [];
        for (let i = 0; i < 24; ++i) {
            temp[i] = this.state.tempTemp;
        }
        this.setState({setTemp: temp});
    }

    setResetTemp = value => {
        let temp = 0;
        if (Number.isInteger(value)) {
            this.setState({tempTemp: value});
        }
    }

    setTempState = (index, value) => {
        let temp = this.state.setTemp;
        temp[index] = value;
        this.setState({setTemp: temp});
    }

    render() {
        const {classes} = this.props;
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
                        <Button
                            className={classes.root}
                            onClick={this.resetSliders}
                        >
                            Set All
                        </Button>
                    </Grid>
                    {sliderList}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(SliderContainer);