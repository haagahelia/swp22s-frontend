import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import dao from "../ajax/dao"
import {CheckTimelimit} from '../utils/helpers.js'

import { usePopup } from "../contexts/PopupContext"
import { useOrder } from "../contexts/OrderContext"
import Container from "../components/CommonComponents/Container"
import OrderTable from "../components/OrderTable/Table"

export default function UnsignedTimelimitView() {
    const { setContent } = usePopup()
    const { setOrder } = useOrder()
    const [ unsigned, setUnsigned ] = useState([])

    useEffect(() => {
        fetchUnsignedOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUnsignedOrders = async () => {
        try {
            const data = await dao.getUnsignedOrders();
            console.log("Data: " + data);
            const dataWithId = data.map((d, i) => {
                return { ...d, id: i }
            })

            let timedout = []
            for (let i=0; i< dataWithId.length; i++) {
                if (CheckTimelimit(dataWithId[i])) {
                    timedout.push(dataWithId[i])
                }
            }
            setUnsigned(timedout)
            setContent({ isOpen: true, msg: "Successfully fetched timed out orders" })
        } catch (error) {
            console.log(error);
            setContent({ isOpen: true, msg: `Can't fetch timed out orders, ${error}` })
        }
    };

    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" my={2} color="primary">Timed out Orders</Typography>
            <OrderTable orders={unsigned} setOrder={setOrder} /> 
        </Container>
    )
}
