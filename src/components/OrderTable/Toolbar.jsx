import React from "react"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom"

export default function Toolbar(props) {
    const navigate = useNavigate()
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const signOrder = () => {
        navigate(`/sign/${rowData.uuid}`)
        rowData.setOrder(rowData.uuid)
    }

    const showOrder = () => {
        navigate(`/order/${rowData.uuid}`)
        rowData.setOrder(rowData)
    }

    return (
        <div className="order-table-toolbar">
            <VisibilityIcon 
                onClick={showOrder} 
                color="primary" 
            />

            { 
                !rowData.pu_signature_image && 
                <BorderColorIcon onClick={signOrder} color="warning" /> 
            }
        </div>
    )
}
