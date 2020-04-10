import React  from "react";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";

const useStyle = makeStyles(theme => ({
  warningPanel: {
    marginTop: theme.spacing(2)
  }, 
  button: {
    margin: theme.spacing(2)
  }
}));

function WarningPanel(props) {
  const classes = useStyle();

  return (
    <Container maxWidth="xs" className={classes.warningPanel}>
      <Paper fullWidth elevation="3">
        <WarningIcon fontSize="large" color="error" />
        <Typography variant="h6">{props.message}</Typography>
        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
          onClick={props.onClose}
        >
          {props.closeMessage || "بستن"}
        </Button>
      </Paper>
    </Container>
  );
}

export default WarningPanel;
