import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import dao from "../../ajax/dao";
import { usePopup } from "../../contexts/PopupContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Delete(props) {

    const { setContent } = usePopup();
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const deleteRow = async () => {

            try {
                await dao.deleteOrder(`${rowData.uuid}`);
                setContent({ isOpen: true, msg: `Order has been deleted!` });
                handleClose;
                
            } catch (error) {
                setContent({ isOpen: true, msg: `Can't delete the order, ${error}` });
                handleClose;
            }
        
    }

    const cantDelete = () => {

          setContent({ isOpen: true, msg: `Can't delete signed order` });

      
  
}
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     { 
                !rowData.pu_signature_image && 
            <Button
                size='small'
                color='error'
                onClick={handleClickOpen}><HighlightOffIcon />
            </Button>
    }
       { 
               !!rowData.pu_signature_image && 
            <Button
                size='small'
                color='primary'
                onClick={cantDelete}><HighlightOffIcon />
            </Button>
    }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {rowData.pu_address}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteRow}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

