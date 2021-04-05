import React from "react";
import "./Requests.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Popup from "./RequestPopup.js";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "../firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [open, setOpen] = React.useState(false);
  const vertical = "top";
  const horizontal = "center";
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("requests").get();
      setRequests(data.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="requests">
      <div className="top-bar">
        <div className="left-top-bar">
          <ArrowBackIcon color="primary" className={classes.arrow} />
          <p className="first-text">Service Requests</p>
          <p className="second-text">Service Center / Service Requests</p>
        </div>
        <div className="right-top-bar">
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            snackbar={setOpen}
          ></Popup>
        </div>
      </div>
      <div className="content">
        <table>
          <tr>
            <th>Created</th>
            <th>Request name</th>
            <th>Request type</th>
            <th>ID</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
          {requests.map(request => (
            <tr>
              <td>{request.created}</td>
              <td>{request.name}</td>
              <td>{request.type}</td>
              <td>{request.id}</td>
              <td>{request.desc}</td>
              <td>{request.priority}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </table>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Request created successfully.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Requests;
