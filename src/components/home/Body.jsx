import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button/index';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid/index';
import Avatar from '@material-ui/core/Avatar/index';

import showcase1 from "../../assets/images/showcase-1.jpg";
import showcase2 from "../../assets/images/bg-showcase-2.jpg";
import showcase3 from "../../assets/images/showcase-3.jpg";
import peiman from "../../assets/images/Peiman.jpg";
import julie from "../../assets/images/julie.jpg";
import kyle from "../../assets/images/Kyle.JPG";

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
            <Grid container spacing={0}>
                {/*section 1*/}
                <Grid item xs={6}>
                    <div className={classes.showcase1Text}>
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
                {/*section 2*/}
                <Grid item xs={6}>
                    <div className={classes.showcase2}>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.showcase2Text}>
                        <h2 className={classes.h2}>High Energy Saving Results</h2>
                        <p className={`${classes.lead} ${classes.p}`}>
                            Newly improved smart schedule of Sweet Home keeps the home at optimum tempreture level for
                            maximum energy efficiency and can even change the usage rate based on electricity price
                            during the day.
                        </p>
                    </div>
                </Grid>
                {/*section 3*/}
                <Grid item xs={6}>
                    <div className={classes.showcase3Text}>
                        <h2 className={classes.h2}>Easy to Use Smart & Manual Scheduling</h2>
                        <p className={`${classes.lead} ${classes.p}`}>
                            Sweet Home Thermostat allows the user to easily set up their schedule manualy, or use the
                            smart mode and not have to ever again worry about turning off the heat when leaving the
                            house.
                        </p>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.showcase3}>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.meetOurTeam}>
                    <div>
                        <h2 className={classes.h2MeetOurTeam}>Meet Our Team!</h2>
                        <Grid container spacing={8}>
                            <Grid item xs={4} className={classes.avatar}>
                                <Avatar alt="Peiman" src={peiman} className={classes.bigAvatar}/>
                                <h5 className={classes.h5}>Peiman D.</h5>
                                <p className={classes.testimonial}>"This is fantastic! Thanks so much guys!"</p>
                            </Grid>
                            <Grid item xs={4}>
                                <Avatar alt="Julie" src={julie} className={classes.bigAvatar}/>
                                <h5 className={classes.h5}>Julie L.</h5>
                                <p className={classes.testimonial}>"Bootstrap is amazing. I've been using it to create
                                    lots of super nice landing pages."</p>
                            </Grid>
                            <Grid item xs={4}>
                                <Avatar alt="Kyle" src={kyle} className={classes.bigAvatar}/>
                                <h5 className={classes.h5}>Kyle Y.</h5>
                                <p className={classes.testimonial}>"Thanks so much for making these free resources
                                    available to us!"</p>
                            </Grid>
                        </Grid>
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
    h5: {
        marginBottom: '.5rem',
        marginTop: '16px',
        fontSize: '1.25rem',
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
    },
    lead: {
        fontSize: "1.25rem",
        fontWeight: '300'
    },
    showcase1Text: {
        margin: '0 auto',
        padding: '0 7rem',
        textAlign: 'left',
        marginTop: 'auto !important',
    },
    showcase1: {
        backgroundImage: `url(${showcase1})`,
        background: "no-repeat center center scroll",
        minHeight: '28rem',
        backgroundSize: 'cover',
        backgroundPosition: '50% 7%',
        padding: '0 !important'
    },
    showcase2: {
        backgroundImage: `url(${showcase2})`,
        background: "no-repeat center center scroll",
        minHeight: '28rem',
        backgroundSize: 'cover',
        backgroundPosition: '50% 7%',
        padding: '0 !important'
    },
    showcase2Text: {
        margin: '0 auto',
        padding: '7rem',
        textAlign: 'left',
    },
    showcase3: {
        backgroundImage: `url(${showcase3})`,
        background: "no-repeat center center scroll",
        minHeight: '28rem',
        backgroundSize: 'cover',
        backgroundPosition: '50% 7%',
        padding: '0 !important'
    },
    meetOurTeam: {
        backgroundColor: '#F8F9FA',
        padding: '7rem 0'
    },
    showcase3Text: {
        margin: '0 auto',
        padding: '7rem',
        paddingBottom: 0,
        textAlign: 'left',
    },
    bigAvatar: {
        margin: '0 auto !important',
        width: 192,
        height: 192,
    },
    avatar: {
        textAlign: 'center',
    },
    testimonial: {
        fontWeight: '300!important',
        margin: '0 auto !important',
    },
    h2MeetOurTeam: {
        fontSize: '2rem',
        marginBottom: '3rem',
        lineHeight: '1.2',
    },
};

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);