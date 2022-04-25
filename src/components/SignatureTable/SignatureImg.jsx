import React, { useEffect, useState } from "react"

export default function SignatureImg(props) {
    const [ sigImg, setSigImg ] = useState(null)
    const rowData = props.valueFormatted ? props.valueFormatted : props.value
    
    useEffect(() => {
        rowData.pu_signature_image 
        ? setSigImg(`data:image/png;base64,${rowData.pu_signature_image}`)
        : setSigImg(null)
    }, [rowData])

    return (
        <div>
            {
                sigImg
                ? <img 
                    src={sigImg} 
                    alt="Signature" 
                    width={180} 
                    style={{ border: "1px solid black" }} 
                />
                : ""
            }
        </div>
    )
}
