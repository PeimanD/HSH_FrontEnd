import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Button from '@material-ui/core/Button/index';
import Grid from '@material-ui/core/Grid/index';
import logo from '../../assets/images/logo.png';
import {Link} from 'react-router-dom'

function Navbar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="relative" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <span className={classes.headerLeft}>
                        <img className={classes.headerLeftLogo} src={logo} alt="Logo" height={48}/>
                        <span className={classes.headerLeftFont}>Home Sweet Home</span>
                    </span>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Button component={Link} to="/" color="inherit">Home</Button>
                            <Button component={Link} to="/about" color="inherit">About</Button>
                            <Button component={Link} to="/login" color="inherit">Login</Button>
                            <Button component={Link} to="/contact" color="inherit">Contact</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: 'orange !important',
        boxShadow: 'none',
        color: '#FFFFFF'
    },
    toolBar: {
        alignItems: 'center'
    },
    headerLeft: {
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        justifyContent: 'space-between',
    },
    headerLeftFont: {
        fontSize: '150%',
    },
    headerLeftLogo: {
        verticalAlign: 'middle'
    }
};

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);