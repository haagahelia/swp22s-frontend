import React from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment-mini"
import { 
    Button,
    Card,
    CardContent
} from "@mui/material"

import { useSignature } from "../contexts/SignatureContext"

export default function SignatureView() {
    const navigate = useNavigate()
    const { signature } = useSignature()
    
    return (
        <div className="signature">
            <Button variant="outlined" onClick={() => navigate("/signatures")}>Go Back</Button>
            <Card sx={{ minWidth: 275, margin: "2rem 0"}}>
                {
                    signature.pu_signature_image &&
                    <img src={`data:image/png;base64,${signature.pu_signature_image}`} alt="Signature" />
                }
            
                <CardContent>
                    <h3>{signature.uuid}</h3>
                    {
                        signature.pu_signed_at &&
                        <p>Signed At: {moment(signature.pu_signed_at).format("DD-MM-YYYY HH:mm")}</p>
                    }
                </CardContent>
            </Card>
        </div>
    )
}
