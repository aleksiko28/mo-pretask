import React from "react";
import "./Sidebar.css";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
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

function Sidebar() {
  const classes = useStyles();
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

  return (
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
              setSearch(e.target.value);
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
  );
}

export default Sidebar;
