import React from "react";
import "./Requests.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import Popup from "./RequestPopup.js";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "../firebase";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  arrow: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none"
  },
  icon: {
    color: "#454545",
    fontSize: "30px"
  },
  textField: {
    margin: "5% 0%"
  }
}));

const requestTypes = [
  { value: "Any" },
  { value: "Audit" },
  { value: "Maintenance" },
  { value: "Break/Fix Repair" }
];

const priorities = [
  { value: "High" },
  { value: "Medium" },
  { value: "Night" },
  { value: "Any" }
];

const statuses = [{ value: "Open" }, { value: "Closed" }];

function Requests() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const vertical = "top";
  const horizontal = "center";
  const [requests, setRequests] = React.useState([]);
  const [query, setQuery] = React.useState([]);
  const [isFresh, setIsFresh] = React.useState(true);
  const [state, setState] = React.useState({
    requestType: "Any",
    priority: "Any",
    status: "Open"
  });
  const [search, setSearch] = React.useState("");

  const handleRequest = event =>
    setState({ ...state, requestType: event.target.value });
  const handlePriority = event =>
    setState({ ...state, priority: event.target.value });
  const handleStatus = event =>
    setState({ ...state, status: event.target.value });

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("requests").get();
      const res = data.docs.map(doc => doc.data());
      setRequests(res);
      setQuery(res);
    };
    fetchData();
  }, []);

  const handleSearch = e => {
    setSearch(e);
    if (e != "")
      setQuery(
        requests.filter(request =>
          request.name.toUpperCase().includes(e.toUpperCase())
        )
      );
    else setQuery(requests);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="requests">
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="filter-container">
            <p className="filter-text">FILTER</p>
            <FirstPageIcon className={classes.icon} />
          </div>
          <div className="search-container">
            <TextField
              className={classes.textField}
              id="standard-search"
              label="Search..."
              type="search"
              value={search}
              onChange={e => {
                handleSearch(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              className={classes.textField}
              id="request-types"
              select
              label="Request types"
              value={state.requestType}
              onChange={handleRequest}
            >
              {requestTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.textField}
              id="priority"
              select
              label="Priority"
              value={state.priority}
              onChange={handlePriority}
            >
              {priorities.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.textField}
              id="stat"
              select
              label="Status"
              value={state.status}
              onChange={handleStatus}
            >
              {statuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </div>
      <div className="top-bar">
        <div className="left-top-bar">
          <ArrowBackIcon color="primary" className={classes.arrow} />
          <p className="first-text">Service Requests</p>
          <p className="second-text">Service Center / Service Requests</p>
        </div>
        <div className="right-top-bar">
          <Popup snackbar={setOpen}></Popup>
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
          {query.map(request => (
            <tr key={request.id}>
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
