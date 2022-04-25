import React from "react"

import Navbar from "../components/Navbar"
import SignBoard from "../components/SignBoard"

export default function Sign({ orders, setOrders, order }) {
    return (
        <div className="container">
            <Navbar />
            <SignBoard orders={orders} setOrders={setOrders} order={order} />
        </div>
    )
}
