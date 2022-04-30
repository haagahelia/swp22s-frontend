import React from "react"

import Container from "../components/Container"
import SignBoard from "../components/SignBoard"

export default function Sign({ orders, setOrders, order }) {
    return (
        <Container>
            <SignBoard orders={orders} setOrders={setOrders} order={order} />
        </Container>
    )
}
