import React , {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Button , FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from "@material-ui/core";
import RequestService from '../../services/RequestService' ; 

const useStyles = makeStyles(theme => ({
    dialogRoot: {
        margin: theme.spacing(3),   
    },
    button: {
        margin: theme.spacing(2),
    }
}));

export default function ChangeStatusDialogButton(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false) ;
  const [status, setStatus] = useState(props.request.status); 
  const  buttonLabel = props.label || 'تغییر  وضعیت' ;
  function close(value) {
    setOpen(false) ; 
    if (props.onClose()) {
      props.onClose(value) ; 
    }
  }

  function updateStatus() {
      RequestService.updateRequest(props.request._id , {status : status}).then(() => close(status)) ;
  }
  return (
    <div className={classes.button}>
    <Button color="primary" variant="outlined" onClick={()=>setOpen(true)}>{buttonLabel}</Button>
        <Dialog  aria-labelledby="simple-dialog-title" open={open} onClose={() => setOpen(false)}>
                <FormControl component="fieldset" className={classes.dialogRoot}>
                    <FormLabel component="legend" style={{textAlign:"center"}}>وضعیت</FormLabel>
                    <RadioGroup  value={status} onChange={(e) => setStatus(e.target.value)}>
                        <FormControlLabel value="approved" control={<Radio />} label="تایید شده" />
                        <FormControlLabel value="pending" control={<Radio />} label="در انتظار تایید" />
                        <FormControlLabel value="rejected" control={<Radio />} label="رد شده" />
                    </RadioGroup>
                </FormControl>  
                <Button  className={classes.button} onClick={updateStatus}  color="primary" variant="outlined">تایید</Button> 
        </Dialog>
    </div>
  );
}
