import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import OrdersView from "../views/OrdersView";
import OrderView from "../views/OrderView";
import UnsignedOrdersView from "../views/UnsignedOrdersView";
import SignaturesView from "../views/SignaturesView";
import SignatureView from "../views/SignatureView";
import SignView from "../views/SignView";
import CreateNewOrderView from "../views/CreateNewOrderView";
import UnsignedTimelimitView from "../views/UnsignedTimelimitView";
import EditOrderView from "../views/EditOrderView";
import HomeView from "../views/HomeView";
import { ProtectedRoute } from './PrivateRoute'
import { LogIn } from "../components/LogIn/LogIn";

export default function AppRoutes() {

  const user = localStorage.getItem('user');
  
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LogIn/>} />
      <Route path="/home" element={<Navigate to="/" />} />

      <Route element={
        <ProtectedRoute redirectPath="/login" isAllowed={user} />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/orders" element={<OrdersView />} />
        <Route path="/order/:orderId" element={<OrderView />} />
        <Route path="/edit/:orderId" element={<EditOrderView />} />
        <Route path="/unsigned" element={<UnsignedOrdersView />} />
        <Route path="/signatures" element={<SignaturesView />} />
        <Route path="/unsignedtimelimit" element={<UnsignedTimelimitView />} />
        <Route path="/signatures/:id" element={<SignatureView />} />
        <Route path="/sign/:orderId" element={<SignView />} />
        <Route path="/new" element={<CreateNewOrderView />} />
        </Route>
      </Routes>
    </Router>
  );
}
