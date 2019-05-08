import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import background from '../../assets/images/login_background.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import logo from "../../assets/images/logo.png";
import Button from '@material-ui/core/Button/index';
import {Link} from "react-router-dom";

function Login(props) {
    const {classes} = props;
    return (
        <div className={classes.backgroundImage}>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.top}>
                            <img className={classes.transLogo} src={logo}/>
                            <h1 className={classes.h1}>Login Here</h1>
                        </div>
                        <TextField
                            label="User Name"
                            placeholder={'Enter UserName'}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    color: 'white'
                                }
                            }}
                        />
                        <TextField
                            label="Password"
                            placeholder={'Enter Password'}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    color: 'white'
                                }
                            }}
                        />
                        <div className={classes.loginButtonContainer}>
                            <Button component={Link} to="/Thermostats" variant="contained" size="medium"
                                    color="primary" className={classes.loginButton}>Login</Button>
                        </div>
                        <div className={classes.bottomContainer}>
                            <a href="/" style={{textDecoration: 'none'}}><p className={classes.bottomLinks}>Forgot your
                                password?</p></a>
                            <a href="/" style={{textDecoration: 'none'}}><p className={classes.bottomLinks}>Don't have
                                an account?</p></a>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

const styles = theme => ({
    paper: {
        height: 580,
        width: 450,
        marginTop: '30%',
        borderRadius: '15px',
        backgroundColor: 'rgba(100,100,100,0.8)',
        color: 'white !important',
        textAlign: 'center',
    },
    backgroundImage: {
        backgroundImage: `url(${background})`,
        background: "no-repeat center center scroll",
        backgroundSize: 'cover',
        position: 'absolute',
        left: 0,
        right: 0,
        minWidth: '100vw',
        minHeight: '60vw',
        margin: 'auto 0',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
        marginBottom: '10px',
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "white !important"
    },
    transLogo: {
        backgroundColor: '#F66225',
        borderRadius: '15px',
        marginTop: '-100px'
    },
    h1: {
        marginTop: 0,
        marginBottom: '8px',
        lineHeight: 1.2,
        fontSize: '2.5rem'
    },
    top: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    loginButtonContainer: {
        textAlign: 'center',
        width: '100%',
        marginTop: '30px',
    },
    loginButton: {
        textAlign: 'center',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: '15px',
        width: "80%",
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    bottomContainer: {
        textAlign: 'center',
        marginTop: '60px',
    },
    bottomLinks: {
        color: 'white !important',
    }
});

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);