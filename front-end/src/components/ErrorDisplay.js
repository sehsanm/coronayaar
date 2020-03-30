import React, { useState } from "react";
import { Snackbar, Typography } from "@material-ui/core";
import {Alert} from '@material-ui/lab' ; 
function ErrorDisplay(props) {
  let [openState, setOpenState] = useState([]);
  function closeSnack(ind) {
    let newState = openState.slice();
    newState[ind] = "closed";
    setOpenState(newState);
  }
  function getSnackBar(msg, ind) {
    return (
        <Typography color="error" variant="h6" >{msg}</Typography> 
    );
  }
  console.log('Error Display:' , props); 

  if (props.errors && props.errors.length > 0) {
    return <div>{props.errors.map((err, ind) => getSnackBar(err, ind))}</div>;
  }

  return null;
}

export default ErrorDisplay;
