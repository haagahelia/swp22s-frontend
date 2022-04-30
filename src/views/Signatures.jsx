import React, { useEffect, useState } from "react"

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
            <h2>Signatures</h2>
            <Table orders={signed} setSignature={setSignature} />
        </Container>
    )
}
