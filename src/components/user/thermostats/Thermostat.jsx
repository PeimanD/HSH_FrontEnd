import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

class Thermostat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            status: this.props.status,
            setTemp: this.props.setTemp,
            currentTemp: this.props.currentTemp
        };
    };

    set_schedule_cur_thermo_id = () => {
        this.props.set_schedule_cur_thermo_id(this.state.id);
    };

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>

                <Button
                    component={Link} to="/Schedule"
                    className={classes.card}
                    onClick={this.set_schedule_cur_thermo_id}
                >
                    <CardContent>
                        <Typography variant="h5" component="h2">Thermostat #{this.state.id}</Typography>
                        <Typography className={classes.pos}
                                    color="textSecondary">Status: {this.state.status ? 'Automatic' : 'Manual'}</Typography>
                        <Typography component="p">Set Temperature: {this.state.setTemp}</Typography>
                        <Typography component="p">Current Temperature: {this.state.currentTemp}</Typography>
                    </CardContent>
                </Button>
            </Card>
        );
    }
}

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

Thermostat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Thermostat);
