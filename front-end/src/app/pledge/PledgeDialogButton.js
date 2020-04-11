import React , {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dialog } from "@material-ui/core";
import PledgeForm from '../pledge/PledgeForm' ; 

const useStyles = makeStyles(theme => ({
}));

export default function PledgeDialogButton(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false) ;
  const  buttonLabel = props.label || 'تامین نیازمندی' ;
  function close(value) {
    setOpen(false) ; 
    if (props.onClose()) {
      props.onClose(value) ; 
    }
  }

  return (
      <div>
            <Button color="primary" variant="outlined" onClick={()=>setOpen(true)}>{buttonLabel}</Button>
            <Dialog  aria-labelledby="simple-dialog-title" open={open} onClose={() => setOpen(false)}>
                <PledgeForm request={props.request}  onClose={close} pledge={props.pledge}/>
            </Dialog>

      </div>
  );
}
