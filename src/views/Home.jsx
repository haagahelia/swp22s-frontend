import React from "react"

import Container from "../components/Container"
import OrderTable from "../components/OrderTable/Table"

export default function Home({ orders, setOrder }) {
    return (
        <Container>
            <h2>Orders</h2>
            <OrderTable orders={orders} setOrder={setOrder} /> 
        </Container>
    )
}
