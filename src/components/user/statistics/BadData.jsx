import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import './graph.css';

const style = theme => ({
    paper: {
        width: '70vw',
        height: '50vh',
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

let BadData = props => {
    const {classes} = props;
    return (
        <div className={classes.paper}>
            <p className={classes.innerText}>No Data Found</p>
        </div>
    );
};


export default withStyles(style)(BadData);