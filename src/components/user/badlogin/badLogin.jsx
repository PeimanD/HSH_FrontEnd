import React from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles/index';

const style = theme => ({
    paper: {
        height: '250px',
        width: '250px',
        marginTop: '10%',
        borderRadius: '15px',
        backgroundColor: 'smokewhite',
        textAlign: 'center',
        margin: 'auto',
    },
    innerText: {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
});

function badLogin(props) {
    const {classes} = props;
    return (
        <Paper className={classes.paper}>
            <p className={classes.innerText}>Please log in to view</p>
        </Paper>
    );
}

export default withStyles(style)(badLogin)