import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SideNav from "../SideNav";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <SideNav/>

            </div>
        );
    }
}

const styles = {

};

Schedule.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);
