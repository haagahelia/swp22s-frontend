import React from "react"
import { Snackbar } from '@mui/material';

import { usePopup } from "../../contexts/PopupContext";

export default function Popup({ isOpen, setIsOpen, msg }) {
    const { content, setContent } = usePopup()

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setContent({ isOpen: false, msg: "" });
    }

    return (
        <Snackbar
            open={content.isOpen}
            autoHideDuration={5000}
            onClose={handleClose}
            message={content.msg}
        />
    )
}
