import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/Paper/index";
import building from "../../assets/images/building0.jpg";
import logo from "../../assets/images/logo.png";
import "./animate.css";

function Header(props) {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.backgroundImage}>
        <button type="button" className={classes.transLogo}>
          <img
            className="animated bounce img-fluid d-block mx-auto"
            alt={"bouncing-logo"}
            src={logo}
          />
          <div>Login</div>
        </button>
      </div>
    </Paper>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: "50%",
    width: "100%"
  },
  backgroundImage: {
    backgroundImage: `url(${building})`,
    background: "no-repeat center center scroll",
    backgroundSize: "cover",
    padding: "4rem 2rem 25rem 2rem !important"
  },
  transLogo: {
    backgroundColor: "rgba(100,100,100,0.2)",
    float: "right !important",
    color: "#ffc107",
    fontSize: "large",
    fontWeight: "bold",
    borderColor: "#ffc107",
    padding: ".375rem .75rem"
  }
});

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
