import React from "react"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router-dom"

export default function Toolbar(props) {
    const navigate = useNavigate()
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const signOrder = () => {
        navigate(`/sign/${rowData.uuid}`)
        rowData.setOrder(rowData.uuid)
    }

    return (
        <div style={{ marginTop: 7 }}>
            <BorderColorIcon onClick={signOrder}/>
        </div>
    )
}
