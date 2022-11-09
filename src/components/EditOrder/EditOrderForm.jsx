import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { TextField } from "@mui/material";
import dao from "../../ajax/dao";
import moment from "moment-timezone";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { usePopup } from "../../contexts/PopupContext";
import { useOrders } from "../../contexts/OrdersContext"

export default function EditOrderForm({ types, countries, order }) {
  const navigate = useNavigate();
  const { orders, setOrders } = useOrders()
  const { setContent } = usePopup();
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState();

  useEffect(() => {
    setType(order?.order_type)
    setCountry(order?.country_code)
    setAddress(order?.pu_address)
    setDate(new Date(new Date(order.pu_planned_time).toLocaleString('en-US', {timeZone: "UTC"})))
  }, [order])

  const submitTask = async () => {
    const editedOrder = {
      uuid: order.uuid,
      pu_planned_time: moment(date).format("YYYY-MM-DD HH:mm"),
      order_type: type,
      pu_address: address,
      country_code: country,
      pu_signed_at: order.pu_signed_at ? moment(order.pu_signed_at).tz("GMT0").format("YYYY-MM-DD HH:mm") : null
    };

    //fetch, handdle response, show success message in a message flash
    //navigate("/")
    try {
      await dao.editOrder(editedOrder);
      const index = orders.findIndex(x => x.uuid === editedOrder.uuid)
      setOrders([
        ...orders.slice(0, index),
        { 
          ...editedOrder, 
          pu_planned_time: moment(date).tz("Etc/GMT-6").format("YYYY-MM-DD HH:mm"),
          pu_signed_at: order.pu_signed_at ? moment(order.pu_signed_at).tz("Etc/GMT-3").format("YYYY-MM-DD HH:mm") : null,
        },
        ...orders.slice(index + 1)
      ])
      setContent({ isOpen: true, msg: `Order ${order.uuid} has been edited!` });
      navigate("/orders");
    } catch (error) {
      setContent({ isOpen: true, msg: `Can't edit the order, ${error}` });
    }
  };

  if (!order) return null

  return (
    <Card className="card">
      <CardContent>
        <h2>Edit Order {order.uuid}</h2>
        <FormLabel>UUID</FormLabel>
        <TextField
          disabled
          margin="dense"
          fullWidth
          value={order.uuid}
        />

        <FormLabel>Address</FormLabel>
        <TextField
          margin="dense"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <FormLabel>Order type</FormLabel>
        {types.length > 0 && (
          <Select
            defaultValue={types[0].order_type}
            margin="dense"
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types?.map((x) => (
              <MenuItem key={x.order_type} value={x.order_type}>
                {x.order_type}
              </MenuItem>
            ))}
          </Select>
        )}

        <FormLabel>Country</FormLabel>
        {countries?.length > 0 && (
          <Select
            defaultValue={countries[0].id}
            margin="dense"
            fullWidth
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries?.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        )}

        <FormLabel>Date of pick up</FormLabel>
        <br/>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={date}
          onChange={(newVal) => setDate(newVal)}
        />
      </CardContent>

      <CardActions>
        <Button variant="outlined" size="small" onClick={submitTask}>
          Submit changes
        </Button>
      </CardActions>
    </Card>
  );
}
