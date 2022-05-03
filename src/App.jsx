import React from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import PopupProvider from "./contexts/PopupContext"
import OrdersProvider from './contexts/OrdersContext';
import OrderProvider from "./contexts/OrderContext"
import SignatureProvider from './contexts/SignatureContext';
import AppRoutes from './routes';
import Popup from "./components/CommonComponents/Popup"

function App() {
  // const [ orders, setOrders ] = useState([])
  // const [ isOpen, setIsOpen ] = useState(false)
  // const [ msg, setMsg ] = useState("")
  // const [ order, setOrder ] = useState({})
  // const [ signature, setSignature ] = useState({})

  return (
    <PopupProvider>
      <OrdersProvider>
        <OrderProvider>
          <SignatureProvider>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home orders={orders} setOrder={setOrder} />} />
          <Route path="/order/:orderId" element={<Order order={order} setOrder={setOrder} />} />
          <Route path="/unsigned" element={<UnsignedOrders orders={orders} setOrder={setOrder} />} />
          <Route path="/signatures" element={<Signatures orders={orders} setSignature={setSignature} />} />
          <Route path="/sign/:orderId" element={<Sign orders={orders} setOrders={setOrders} order={order} />} />
          <Route path="/signatures/:id" element={<Signature signature={signature} />} />
        </Routes>
      </Router> */}
            <AppRoutes />
            <Popup />
          </SignatureProvider>
        </OrderProvider>
      </OrdersProvider>
    </PopupProvider>
  );
}

export default App;
