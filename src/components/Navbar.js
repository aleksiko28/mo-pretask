import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none"
  },
  divider: {
    height: "80%",
    margin: "5% 0%"
  },
  icon: {
    fontSize: "30px"
  }
}));

function Navbar() {
  const classes = useStyles();
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-and-text">
            <div className="navbar-logo">
              <img src={process.env.PUBLIC_URL + "/Outotec-Logo.svg"} />
            </div>
            <div className="top-text">
              <p>Service Center</p>
            </div>
          </div>

          <div className="account">
            <Divider
              className={classes.divider}
              orientation="vertical"
              flexItem
            />
            <Button
              className={classes.button}
              variant="outlined"
              startIcon={<AccountBoxIcon className={classes.icon} />}
            >
              Username
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
