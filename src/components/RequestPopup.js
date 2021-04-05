import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import firebase from "../firebase";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "24px auto 0px auto"
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textField: {
    width: "100%",
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

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [id, setId] = React.useState();
  const [desc, setDesc] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const classes = useStyles();
  const { snackbar } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    var nowDate = new Date();
    var created =
      nowDate.getDate() +
      "." +
      (nowDate.getMonth() + 1) +
      "." +
      nowDate.getFullYear() +
      " " +
      nowDate.getHours() +
      "." +
      (nowDate.getMinutes() < 10 ? "0" : "") +
      nowDate.getMinutes();
    var status = "Open";
    const db = firebase.firestore();
    db.collection("requests").add({
      created,
      name,
      type,
      id,
      desc,
      priority,
      status
    });
    setOpen(false);
    snackbar(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New service request
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        roboto-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New service request</DialogTitle>
        <DialogContent>
          <div className={classes.fieldsContainer}>
            <TextField
              id="request-name"
              label="Request name"
              style={{ margin: 8 }}
              placeholder="Type"
              required
              value={name}
              margin="normal"
              onChange={e => {
                setName(e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="request-type"
              label="Request type"
              style={{ margin: 8 }}
              placeholder="Select"
              required
              select
              value={type}
              margin="normal"
              onChange={e => {
                setType(e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
            >
              {requestTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="id"
              label="ID"
              style={{ margin: 8 }}
              placeholder="Type"
              required
              value={id}
              margin="normal"
              onChange={e => {
                setId(e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="description"
              label="Description"
              style={{ margin: 8 }}
              margin="normal"
              value={desc}
              onChange={e => {
                setDesc(e.target.value);
              }}
              placeholder="Type"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="priority"
              label="Priority"
              style={{ margin: 8 }}
              margin="normal"
              select
              value={priority}
              onChange={e => {
                setPriority(e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
            >
              {priorities.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
