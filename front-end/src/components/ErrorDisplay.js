import React, { useState } from "react";
import { Typography } from "@material-ui/core";
function ErrorDisplay(props) {
  function getSnackBar(msg) {
    return (
        <Typography color="error" variant="h6" >{msg+ ''}</Typography> 
    );
  }
  console.log('Error Display:' , props); 

  if (props.errors && Array.isArray(props.errors) && props.errors.length > 0) {
    return <div>{props.errors.map((err, ind) => getSnackBar(err))}</div>;
  } else {
    return getSnackBar(props.errors); 
  }

  return null;
}

export default ErrorDisplay;
