import React, { useState, createContext, useContext } from "react"

const OrderContext = createContext()

export const useOrder = () => useContext(OrderContext)

export default function OrderProvider({ children }) {
    const [ order, setOrder ] = useState({})

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    )
}