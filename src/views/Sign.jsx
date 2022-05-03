import React from "react"

import Container from "../components/CommonComponents/Container"
import SignBoard from "../components/Sign/SignBoard"

export default function Sign({ orders, setOrders, order }) {
    return (
        <Container>
            <SignBoard orders={orders} setOrders={setOrders} order={order} />
        </Container>
    )
}
