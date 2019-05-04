import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

function Footer(props) {
    const {classes} = props;
    return (
        <footer className={classes.root}>
            <Button component={Link} to="/" color="inherit">About</Button>
            <Button component={Link} to="/" color="inherit">Contact</Button>
            <Button component={Link} to="/" color="inherit">Terms of Use</Button>
            <Button component={Link} to="/" color="inherit">Privacy Policy</Button>
            <div className={classes.copyright}>Copyright © Home Sweet Home 2019 & BCIT CST Team 47</div>
        </footer>
    );
}

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: '#ffc107',
        color: 'white',
        padding: '0 15px',
        margin: '0 auto !important',
    },
    copyright: {
        marginTop: '50px'
    }
});

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);