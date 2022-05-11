import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"



import OrdersView from '../views/OrdersView'
import OrderView from '../views/OrderView'
import UnsignedOrdersView from "../views/UnsignedOrdersView"
import SignaturesView from '../views/SignaturesView'
import SignatureView from '../views/SignatureView'
import SignView from '../views/SignView'
import CreateNewOrder from '../views/CreateNewOrder'
import UnsignedTimelimitView from '../views/UnsignedTimelimitView'

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OrdersView />} />
                <Route path="/order/:orderId" element={<OrderView />} />
                <Route path="/unsigned" element={<UnsignedOrdersView />} />
                <Route path="/signatures" element={<SignaturesView />} />
                <Route path="/unsignedtimelimit" element={<UnsignedTimelimitView/>}/>
                <Route path="/signatures/:id" element={<SignatureView />} />
                <Route path="/sign/:orderId" element={<SignView />} />
                <Route path="/new" element={<CreateNewOrder />} />
            </Routes>
        </Router>
    )
}
