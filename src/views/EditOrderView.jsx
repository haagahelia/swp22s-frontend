import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import dao from "../ajax/dao";

import { usePopup } from "../contexts/PopupContext";
import { useOrder } from "../contexts/OrderContext";
import EditOrderForm from "../components/EditOrder/EditOrderForm";

export default function EditOrder() {
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const { setContent } = usePopup();
  const { order } = useOrder();

  // Fetching data from db
  const fetchCountries = async () => {
    try {
      const data = await dao.getCountry();
      setCountries(data);
    } catch (error) {
      console.log(error);
      setContent({ isOpen: true, msg: `Can't fetch orders, ${error}` });
    }
  };

  const fetchOrderType = async () => {
    try {
      const data = await dao.getTypeOrder();
      setTypes(data);
      setContent({ isOpen: true, msg: "Successfully fetched types" });
    } catch (error) {
      console.log(error);
      setContent({ isOpen: true, msg: `Can't fetch types, ${error}` });
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchOrderType();
    // eslint-disable-next-line
  }, []); //has tried to use callback + set dependencies to solve the warning here but it slows down the app significantly

  return (
    <div className="order">
      <Button variant="outlined" onClick={() => navigate("/")}>
        Cancel
      </Button>

      <EditOrderForm types={types} countries={countries} order={order} />
    </div>
  );
}
