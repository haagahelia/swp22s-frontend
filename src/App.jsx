import React from 'react';
import './styles/app.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import PopupProvider from "./contexts/PopupContext"
import OrdersProvider from './contexts/OrdersContext';
import OrderProvider from "./contexts/OrderContext"
import SignatureProvider from './contexts/SignatureContext';
import AppRoutes from './routes';
import Popup from "./components/CommonComponents/Popup"

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
    <PopupProvider>
      <OrdersProvider>
        <OrderProvider>
          <SignatureProvider>
            <AppRoutes />
            <Popup />
          </SignatureProvider>
        </OrderProvider>
      </OrdersProvider>
    </PopupProvider>
    </LocalizationProvider>
  );
}

export default App;
