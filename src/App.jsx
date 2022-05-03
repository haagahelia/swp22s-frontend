import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import dao from './ajax/dao';

import Home from './views/Home';
import UnsignedOrders from './views/UnsignedOrders';
import Sign from './views/Sign';
import Signatures from './views/Signatures';
import Signature from './views/Signature';
import Popup from './components/CommonComponents/Popup';
import Order from './views/Order';

function App() {
  const [ orders, setOrders ] = useState([])
  const [ isOpen, setIsOpen ] = useState(false)
  const [ msg, setMsg ] = useState("")
  const [ order, setOrder ] = useState({})
  const [ signature, setSignature ] = useState({})

  useEffect(() => {
    fetchOrders()
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
      setIsOpen(true)
      setMsg("Successfully fetched orders")
    } catch (error) {
        console.log(error);
        setIsOpen(true)
        setMsg(`Can't fetch orders, ${error}`)
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home orders={orders} setOrder={setOrder} />} />
          <Route path="/order/:orderId" element={<Order order={order} setOrder={setOrder} />} />
          <Route path="/unsigned" element={<UnsignedOrders orders={orders} setOrder={setOrder} />} />
          <Route path="/signatures" element={<Signatures orders={orders} setSignature={setSignature} />} />
          <Route path="/sign/:orderId" element={<Sign orders={orders} setOrders={setOrders} order={order} />} />
          <Route path="/signatures/:id" element={<Signature signature={signature} />} />
        </Routes>
      </Router>

      <Popup isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
    </div>
  );
}

export default App;
