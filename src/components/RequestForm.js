import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  makeStyles,
  Paper,
  Typography,
  Divider
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
  },
  submit: {
    width: "30%",
    margin: "5% 0%"
  },
  desc: {
    height: 140
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormTab(props) {
  const { handleSubmit, register, reset } = useForm();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = data => {
    handleClick();
    <Alert onClose={handleClose} severity="success">
      Request created succesfully.
    </Alert>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.fieldsContainer}>
        <TextField
          id="request-name"
          label="Request name"
          style={{ margin: 8 }}
          placeholder="Type"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="request-type"
          label="Request type"
          style={{ margin: 8 }}
          placeholder="Type"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="id"
          label="ID"
          style={{ margin: 8 }}
          placeholder="Type"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="description"
          label="Description"
          style={{ margin: 8 }}
          margin="normal"
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
          InputLabelProps={{
            shrink: true
          }}
        ></TextField>
        <Divider></Divider>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submit}
        >
          SEND
        </Button>
      </div>
    </form>
  );
}
