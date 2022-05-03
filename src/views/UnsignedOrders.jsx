import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"

import Container from "../components/CommonComponents/Container"
import OrderTable from "../components/OrderTable/Table"

export default function UnsignedOrders({ orders, setOrder }) {
    const [ unsigned, setUnsigned ] = useState([])

    useEffect(() => {
        const unsignedOrders = orders.filter(x => x.pu_signed_at === null)
        setUnsigned(unsignedOrders)
    }, [orders])

    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" my={2} color="primary">Unsigned Orders</Typography>
            <OrderTable orders={unsigned} setOrder={setOrder} /> 
        </Container>
    )
}
