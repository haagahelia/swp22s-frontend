import React from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import dao from "../../ajax/dao";

export default function Delete(props) {
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const deleteRow = () => {
        if (window.confirm('Wait!... Are you sure you want to delete this order?')) {
            dao.deleteOrder(`${rowData.uuid}`)
            dao.getOrders()
        }
        
    }

    return (
        <div className="order-table-toolbar">
            <Button
                size='small'
                color='error'
                onClick={deleteRow}><HighlightOffIcon />
            </Button>
        </div>
    )
}