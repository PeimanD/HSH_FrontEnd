import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SideNav from "../SideNav";
import SliderContainer from "./SliderContainer";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '60vw',
        marginLeft: '27vw',
    },
    colorSwitchBase: {
        '&$colorChecked': {
            color: 'orange',
            '& + $colorBar': {
                backgroundColor: 'orange',
            },
        },
    },
    colorChecked: {
        color: 'orange',
    },
    colorBar: {
        color: 'orange',
    },
});

class Schedule extends React.Component {
    state = {
        value: 0,
        mode: 'Schedule',
        status: true,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleStatusChange = () => event => {
        // handle the big on/off state change
        this.setState({ status: event.target.checked });
    }

    handleModeChange = event => {
        this.setState({ mode: event.target.value });
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div>
                <SideNav />
                <div className={classes.root}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.weekState}
                                onChange={this.handleStatusChange()}
                                classes={{
                                    switchBase: classes.colorSwitchBase,
                                    checked: classes.colorChecked,
                                    bar: classes.colorBar,
                                }}
                            />
                        }
                        label="Status"
                        labelPlacement='start'
                    />
                    <FormControlLabel
                        control={
                            <RadioGroup
                                aria-label="Mode"
                                name="mode"
                                value={this.state.mode}
                                onChange={this.handleModeChange}
                                row
                            >
                                <FormControlLabel
                                    value="Manual"
                                    control={<Radio color="primary" />}
                                    label="Manual"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value="Schedule"
                                    control={<Radio color="primary" />}
                                    label="Schedule"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value="Smart"
                                    control={<Radio color="primary" />}
                                    label="Smart"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        }
                    />
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons={'auto'}
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
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer /></TabContainer>
                    </SwipeableViews>

                </div>
            </div>

        );
    }
}

Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Schedule);