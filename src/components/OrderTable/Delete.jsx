import React from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import dao from "../../ajax/dao";
import { usePopup } from "../../contexts/PopupContext";
import { useNavigate } from "react-router-dom";

export default function Delete(props) {
    const { setContent } = usePopup();
    const navigate = useNavigate()
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const deleteRow = async () => {
        if (window.confirm('Wait!... Are you sure you want to delete this order?')) {
            try {
                await dao.deleteOrder(`${rowData.uuid}`);
                dao.getOrders()
                setContent({ isOpen: true, msg: `Order has been deleted!` });
                navigate("/");
            } catch (error) {
                setContent({ isOpen: true, msg: `Can't delete the order, ${error}` });
            }
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