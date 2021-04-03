import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
    right: theme.spacing(1)
  }
}));

function RequestPopup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();
  return (
    <Dialog
      classes={{ paper: classes.dialogWrapper }}
      open={openPopup}
      maxwidth="md"
    >
      <DialogTitle>
        <Typography component="div" variant="h6" style={{ color: "grey" }}>
          CREATE NEW SERVICE REQUEST
        </Typography>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default RequestPopup;
