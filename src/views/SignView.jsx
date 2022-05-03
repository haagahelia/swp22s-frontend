import React from "react"

import { useOrders } from "../contexts/OrdersContext"
import { useOrder } from "../contexts/OrderContext"
import Container from "../components/CommonComponents/Container"
import SignBoard from "../components/Sign/SignBoard"

export default function SignView() {
    const { orders, setOrders } = useOrders()
    const { order } = useOrder()

    return (
        <Container>
            <SignBoard orders={orders} setOrders={setOrders} order={order} />
        </Container>
    )
}
