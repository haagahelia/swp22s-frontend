import React, { useEffect } from "react"
import { Typography } from "@mui/material"
import dao from "../ajax/dao"

import { usePopup } from "../contexts/PopupContext"
import { useOrders } from "../contexts/OrdersContext"
import { useOrder } from "../contexts/OrderContext"
import Container from "../components/CommonComponents/Container"
import OrderTable from "../components/OrderTable/Table"

export default function OrdersView() {
    const { orders, setOrders } = useOrders()
    const { setOrder } = useOrder()
    const { setContent } = usePopup()

    useEffect(() => {
        fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Fetching all tasks
    const fetchOrders = async () => {
        try {
            const data = await dao.getOrders();
            console.log("Data: " + data);
            const dataWithId = data.map((d, i) => {
                return { ...d, id: i }
            })

            setOrders(dataWithId)
            setContent({ isOpen: true, msg: "Successfully fetched orders" })
        } catch (error) {
            console.log(error);
            setContent({ isOpen: true, msg: `Can't fetch orders, ${error}` })
        }
    };

    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" my={2} color="primary">Orders</Typography>
            <OrderTable orders={orders} setOrder={setOrder} /> 
        </Container>
    )
}
