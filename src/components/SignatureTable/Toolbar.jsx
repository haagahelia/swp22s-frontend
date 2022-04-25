import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

export default function Toolbar(props) {
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const deleteSignature = async () => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`http://195.148.22.114:8777/api/signatures/${rowData.id}`)
                props.data.setSig(props.data.sig.filter(x => x.id !== rowData.id))
                props.data.setOpen(true)
                props.data.setMsg("Successfully deleted signature")
            } catch (error) {
                props.data.setOpen(true)
                props.data.setMsg(`Error delete signature: ${error}`)
            }
        }
    }

    return (
        <div style={{ marginTop: 8 }} onClick={deleteSignature}>
            <DeleteIcon color="error" />
        </div>
    )
}
