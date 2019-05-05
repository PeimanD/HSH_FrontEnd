import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SideNav from "../SideNav";
import SliderContainer from "./SliderContainer";

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
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
});

class Schedule extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <div>
                <SideNav/>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons={'auto'}
                        >
                            <Tab label="Monday"/>
                            <Tab label="Tuesday"/>
                            <Tab label="Wednesday"/>
                            <Tab label="Thursday"/>
                            <Tab label="Friday"/>
                            <Tab label="Saturday"/>
                            <Tab label="Sunday"/>
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
                        <TabContainer dir={theme.direction}><SliderContainer/></TabContainer>
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

export default withStyles(styles, {withTheme: true})(Schedule);