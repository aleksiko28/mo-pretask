import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import firebase from "../firebase";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  root: {
    margin: "auto",
    padding: "50px 20px"
  }
}));

const requestTypes = [
  { value: "Audit" },
  { value: "Maintenance" },
  { value: "Break/Fix Repair" }
];

const priorities = [{ value: "High" }, { value: "Medium" }, { value: "Night" }];

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [id, setId] = React.useState("");
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

  const makeDate = () => {
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
    return created;
  };

  const handleSubmit = () => {
    if (name !== "" && type !== "" && id !== "" && priority !== "") {
      var status = "Open";
      const db = firebase.firestore();
      var created = makeDate();
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
    } else {
      // TODO: display error message(s) if form invalid
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New service request
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        roboto-labelledby="form-dialog-title"
      >
        <div className={classes.dialogContainer}>
          <DialogTitle id="form-dialog-title">New service request</DialogTitle>
          <DialogContent dividers className={classes.root}>
            <div className={classes.fieldsContainer}>
              <TextField
                id="request-name"
                label="Request name"
                style={{ margin: 8 }}
                placeholder="Type"
                required
                value={name}
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
            <Button onClick={handleClose} size="large" color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} size="large" color="primary">
              Send
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
