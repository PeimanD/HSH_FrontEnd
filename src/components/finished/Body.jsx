import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button/index';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import showcase1 from "../../assets/images/showcase-1.jpg";
import logo from "../../assets/images/logo.png";
import building from "../../assets/images/building0.jpg";
import Paper from "@material-ui/core/Paper";


function Body(props) {
    const {classes} = props;
    return (
        <div>
            <section className={classes.firstSectionContainer}>
                <div className={classes.firstSection}>
                    <h1 className={classes.h1}>A Smart Thermostat Reimagined</h1>
                    <p className={`${classes.lead} ${classes.p}`}>A low-cost smart thermostat, realized as a system of
                        modular devices
                        with a central unit.</p>
                    <p className={`${classes.p}`}>
                        Smart thermostats add comfort, accessibility and energy saving capabilities to a home. Most
                        smart
                        thermostats in the market have some negative drawbacks as they are costly and it is not feasible
                        to
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
                    <Button component={Link} to="/" variant="contained" size="medium" color="primary">Find Out
                        More</Button>
                </div>
            </section>
            <Grid container spacing={24}>
                <Grid item xs={6}>
                    <div className={classes.bottomSection}>
                        <h2 className={classes.h2}>Designed for Your Maximum Comfort</h2>
                        <p className={`${classes.lead} ${classes.p}`}>
                            When designing Sweet Home thermostat, we have the users confort at the forefront of our
                            mind. An incredibly simple setup to start, and a worry-free use for its lifetime. This smart
                            thermostat sets your favorit tempreture setting for maximum comfort when you are home, and
                            saves energy seamlessly when you are out, or sleep!
                        </p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.showcase1}>
                    </div>
                </Grid>
            </Grid>
        </div>
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
    h2: {
        fontSize: '2rem',
        marginBottom: '.5rem',
        lineHeight: '1.2',
    },
    firstSectionContainer: {
        width: '100%',
        paddingTop: '3rem !important',
    },
    firstSection: {
        width: '60%',
        textAlign: 'left',
        paddingRight: '15px',
        paddingLeft: '15px',
        margin: '0 auto',
        marginBottom: '48px'
    },
    p: {
        lineHeight: 1.5,
        marginTop: 0,
    },
    lead: {
        fontSize: "1.25rem",
        fontWeight: '300'
    },
    bottomSection: {
        margin: '0 auto',
        padding: '7rem'
    },
    showcase1: {
        backgroundImage: `url(${showcase1})`,
        background: "no-repeat center center scroll",
        minHeight: '30rem',
        backgroundSize: 'cover',
        backgroundPosition: '50% -10%'
    },
};

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);