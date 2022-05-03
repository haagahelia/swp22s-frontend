import React, { useState, createContext, useContext } from "react"

const OrdersContext = createContext()

export const useOrders = () => useContext(OrdersContext)

export default function OrdersProvider({ children }) {
    const [ orders, setOrders ] = useState([])

    return (
        <OrdersContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrdersContext.Provider>
    )
}