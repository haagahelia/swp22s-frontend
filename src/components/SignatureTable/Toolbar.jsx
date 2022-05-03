import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export default function Toolbar(props) {
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    const deleteSignature = async () => {
        console.log(rowData)
        if (window.confirm('Are you sure?')) {
            try {      // TODO: Should the delete happen via dao.js ???
                await axios.delete(`${baseUrl}/signatures/${rowData.id}`)
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
