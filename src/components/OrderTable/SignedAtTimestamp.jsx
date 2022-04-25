import React, { useEffect, useState } from "react"
import moment from "moment-mini"

export default function SignedAtTimeStamp(props) {
    const [ timestamps, setTimestamps ] = useState(null)
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    useEffect(() => {
        if (rowData.pu_signed_at) {
            const ts = moment(rowData.pu_signed_at).format("DD-MM-YYYY HH:mm")
            setTimestamps(ts)
        }
    }, [rowData])

    return (
        <div>{timestamps}</div>
    )
}
