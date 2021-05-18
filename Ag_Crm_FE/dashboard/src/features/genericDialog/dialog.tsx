import { Button,  Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

type BaseDialogProps = {
    title : string,
    children : any,
    open : boolean,
    setOpen : any,
    onConfirm  : any
}   

const BaseDialog = (props : BaseDialogProps) => {
  const { title, children, open, setOpen, onConfirm} = props;
  
  return (
    <Dialog
      open={open}
      onClose={() => setOpen({open:false})}
      aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen({open:false})} color="secondary">No</Button>

        <Button variant="contained" onClick={() => {setOpen({open:false}); onConfirm({onConfirm}); }} color="default"> Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;