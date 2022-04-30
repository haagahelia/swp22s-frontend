import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"

import Container from "../components/Container"
import Table from "../components/SignatureTable/Table"

export default function Signatures({ orders, setSignature }) {
    const [ signed, setSigned ] = useState([])

    useEffect(() => {
        const signedSigs = orders.filter(x => x.pu_signature_image !== null)
        setSigned(signedSigs)
    }, [orders])

    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" my={2} color="primary">Signatures</Typography>
            <Table orders={signed} setSignature={setSignature} />
        </Container>
    )
}
