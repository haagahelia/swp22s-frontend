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

import { usePopup } from "../../contexts/PopupContext";
//import { useOrder } from "../../contexts/OrderContext";

export default function EditOrderForm({ types, countries, order }) {
  const navigate = useNavigate();
  //const { order, setOrder } = useOrder();

  const { setContent } = usePopup();
  //const [uuid, setUUID] = useState(order.uuid);
  const [type, setType] = useState(order.order_type);
  const [country, setCountry] = useState(order.country_code);
  const [address, setAddress] = useState(order.pu_address);
  const [date, setDate] = useState(order.pu_planned_time);

  const submitTask = async () => {
    const editedOrder = {
      uuid: order.uuid,
      pu_planned_time: date.slice(0, 19).replace("T", " "),
      order_type: type,
      pu_address: address,
      country_code: country,
    };

    console.log(editedOrder);
    //fetch, handdle response, show success message in a message flash
    //navigate("/")
    try {
      await dao.editOrder(editedOrder);
      setContent({ isOpen: true, msg: `Order ${order.uuid} has been edited!` });
      navigate("/");
    } catch (error) {
      setContent({ isOpen: true, msg: `Can't edit the order, ${error}` });
    }
  };

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
          // onChange={(e) => setUUID(e.target.value)}
          // placeholder="Please enter a random string with maximum 24 characters for testing"
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
        <TextField
          margin="dense"
          fullWidth
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
