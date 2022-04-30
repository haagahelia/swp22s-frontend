import React, { useState, useEffect } from "react"

import Container from "../components/Container"
import OrderTable from "../components/OrderTable/Table"

export default function UnsignedOrders({ orders, setOrder }) {
    const [ unsigned, setUnsigned ] = useState([])

    useEffect(() => {
        const unsignedOrders = orders.filter(x => x.pu_signed_at === null)
        setUnsigned(unsignedOrders)
    }, [orders])

    return (
        <Container>
            <h2>Unsigned Orders</h2>
            <OrderTable orders={unsigned} setOrder={setOrder} /> 
        </Container>
    )
}
