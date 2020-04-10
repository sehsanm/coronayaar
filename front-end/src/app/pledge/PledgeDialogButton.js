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


  return (
      <div>
            <Button color="primary" variant="outlined" onClick={()=>setOpen(true)}>تامین نیازمندی</Button>
            <Dialog  aria-labelledby="simple-dialog-title" open={open} onClose={() => setOpen(false)}>
                <PledgeForm request={props.request}  onClose={() => setOpen(false)}/>
            </Dialog>

      </div>
  );
}
