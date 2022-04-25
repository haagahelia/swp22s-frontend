import React, { useEffect, useState } from "react"
import moment from "moment-mini"

export default function PickupTimeStamp(props) {
    const [ timestamps, setTimestamps ] = useState(null)
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    useEffect(() => {
        if (rowData.pu_planned_time) {
            const ts = moment(rowData.pu_planned_time).format("DD-MM-YYYY HH:mm")
            setTimestamps(ts)
        }
    }, [rowData])

    return (
        <div>{timestamps}</div>
    )
}
