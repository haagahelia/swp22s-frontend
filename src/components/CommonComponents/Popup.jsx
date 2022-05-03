import React from "react"
import { Snackbar } from '@mui/material';

export default function Popup({ isOpen, setIsOpen, msg }) {
    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setIsOpen(false);
    }

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={5000}
            onClose={handleClose}
            message={msg}
        />
    )
}
