import React from "react";
import "./Requests.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Popup from "./RequestPopup.js";
import RequestForm from "./RequestForm.js";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  arrow: {
    margin: theme.spacing(1)
  }
}));

function Requests() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = React.useState(false);

  return (
    <div className="requests">
      <div className="top-bar">
        <div className="left-top-bar">
          <ArrowBackIcon color="primary" className={classes.arrow} />
          <p className="first-text">Service Requests</p>
          <p className="second-text">Service Center / Service Requests</p>
        </div>
        <div className="right-top-bar">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenPopup(true)}
            disableElevation
          >
            New service request
          </Button>
          <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <RequestForm />
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Requests;
