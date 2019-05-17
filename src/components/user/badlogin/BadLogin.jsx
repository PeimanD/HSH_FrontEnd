import React, { Component } from 'react';
import Button from '@material-ui/core/Button/index';
import { withStyles } from '@material-ui/core/styles/index';

const style = theme => ({
    button: {
        height: '250px',
        width: '250px',
        marginTop: '10%',
        borderRadius: '15px',
        backgroundColor: 'orange',
        textAlign: 'center',
        margin: 'auto',
        color: 'white',
    },
});

class BadLogin extends Component {
    redirectLogin = () => {
        this.props.history.push("/Login");
    }

    render() {
        const { classes } = this.props;
        return (
            <Button className={classes.button} onClick={this.redirectLogin}>Please log in to view</Button>
        );
    }
}

export default withStyles(style)(BadLogin)