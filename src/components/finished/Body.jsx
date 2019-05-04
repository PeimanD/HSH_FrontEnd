import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button/index';
import {Link} from 'react-router-dom'

function Body(props) {
    const {classes} = props;
    return (
        <section className={classes.firstSectionContainer}>
            <div className={classes.firstSection}>
                <h1 className={classes.h1}>A Smart Thermostat Reimagined</h1>
                <p className={`${classes.lead} ${classes.p}`}>A low-cost smart thermostat, realized as a system of
                    modular devices
                    with a central unit.</p>
                <p className={`${classes.p}`}>
                    Smart thermostats add comfort, accessibility and energy saving capabilities to a home. Most smart
                    thermostats in the market have some negative drawbacks as they are costly and it is not feasible to
                    install one in every apartment room.
                    <strong>
                        We are creating a smart expandable modular thermostats that can
                        provide maximum energy efficiency without the cost and complexity of installing expensive
                        thermostats seperatly in each room.
                    </strong>
                    As modular units, these thermostats are expandable, allowing the
                    users to add as many units as needed to control the various sections of an apartment, house or
                    office. One centeral account controls all the units in a user friendly enterface.
                </p>
                <p className={`${classes.p}`}>Sign up here and find out more about the project and its progress.</p>
                <Button component={Link} to="/" variant="contained" size="medium" color="primary">Find Out More</Button>
            </div>
        </section>
    );
}

const styles = {
    root: {
        flexGrow: 1,
    },
    h1: {
        marginTop: 0,
        marginBottom: '8px',
        lineHeight: 1.2,
        fontSize: '2.5rem'
    },
    firstSectionContainer: {
        width: '100%',
        paddingTop: '3rem !important',
        // paddingBottom: '3rem !important',
    },
    firstSection: {
        width: '60%',
        textAlign: 'left',
        paddingRight: '15px',
        paddingLeft: '15px',
        margin: '0 auto '
    },
    p: {
        lineHeight: 1.5,
        marginTop: 0,
    },
    lead: {
        fontSize: "1.25rem",
        fontWeight: '300'
    },
};

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);