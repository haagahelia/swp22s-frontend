import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"

import { useOrders } from "../contexts/OrdersContext"
import { useSignature } from "../contexts/SignatureContext"
import Container from "../components/CommonComponents/Container"
import Table from "../components/SignatureTable/Table"

export default function SignaturesView() {
    const [ signed, setSigned ] = useState([])
    const { orders } = useOrders()
    const { setSignature } = useSignature()

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
