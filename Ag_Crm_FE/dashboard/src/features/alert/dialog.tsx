import { Button,  Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

type ConfirmDialogProps = {
    title : string,
    children : any,
    open : boolean,
    setDialogOpen : any,
    onConfirm  : any
}   

const ConfirmDialog = (props : ConfirmDialogProps) => {
  const { title, children, open, setDialogOpen: setDialogOpen, onConfirm} = props;
  
  return (
    <Dialog
      open={open}
      onClose={() => setDialogOpen({open:false})}
      aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setDialogOpen({open:false})} color="secondary">No</Button>

        <Button variant="contained" onClick={() => {setDialogOpen({open:false}); onConfirm({onConfirm}); }} color="default"> Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;