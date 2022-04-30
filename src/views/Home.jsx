import React from "react"
import { Typography } from "@mui/material"

import Container from "../components/Container"
import OrderTable from "../components/OrderTable/Table"

export default function Home({ orders, setOrder }) {
    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" my={2} color="primary">Orders</Typography>
            <OrderTable orders={orders} setOrder={setOrder} /> 
        </Container>
    )
}
