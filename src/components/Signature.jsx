import React from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment-mini"

export default function Signature({ signature }) {
    const navigate = useNavigate()
    
    return (
        <div className="signature">
            <button onClick={() => navigate("/signatures")}>Go Back</button>
            {
                signature.pu_signature_image &&
                <img src={`data:image/png;base64,${signature.pu_signature_image}`} alt="Signature" />
            }
            <h3>{signature.uuid}</h3>
            {
                signature.pu_signed_at &&
                <p>Signed At: {moment(signature.pu_signed_at).format("DD-MM-YYYY HH:mm")}</p>
            }
        </div>
    )
}
