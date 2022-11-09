import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import dao from "../ajax/dao"

import { usePopup } from "../contexts/PopupContext"
import { useOrders } from "../contexts/OrdersContext"
import { useOrder } from "../contexts/OrderContext"
import Container from "../components/CommonComponents/Container"
import OrderTable from "../components/OrderTable/Table"
import Home from "../components/Home/HomeComponent"
//import { elementAcceptingRef } from "@mui/utils"

export default function OrdersView() {
    const { orders, setOrders } = useOrders()
    const { stats, setStats } = useState([])
    const { setOrder } = useOrder()
    const { setContent } = usePopup()

    // const statsTest = [{order_type:"driving"},{order_type:"cafeteria"}];
    
    useEffect(() => {
        fetchOrders();
        fetchStatistics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /*
    useEffect(() => {
        fetchStatistics();
    }, [orders, stats, fetchStatistics])
    */

    // Fetching all tasks
    const fetchOrders = async () => {
        try {
            const data = await dao.getOrders();
            // console.log("Data: " + data);
            const dataWithId = data.map((d, i) => {
                return { ...d, id: i }
            })

            setOrders(dataWithId)
            // setContent({ isOpen: true, msg: "Successfully fetched orders" })
        } catch (error) {
            console.log(error);
            setContent({ isOpen: true, msg: `Can't fetch orders, ${error}` })
        }
    };

    const fetchStatistics = async () => {
        try {
            const statsList = await dao.getStatsByOrderType();
            console.log("Stats:");
            console.dir(statsList);
            setStats(statsList);
        } catch (error) {
            // console.error(`Error while trying to output stats`);
        }
    }

    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" my={2} color="primary">Orders</Typography>
            <OrderTable orders={orders} setOrders={setOrders} setOrder={setOrder} /> 

            {/*
            <ul>
                {stats.forEach(element => 
                    <li key={element.order_type}>{element.order_type}</li>    
                )}
            </ul>
            */}            
        </Container>        
    )
}
