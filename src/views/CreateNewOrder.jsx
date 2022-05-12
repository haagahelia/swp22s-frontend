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
import dao from "../ajax/dao";

import { usePopup } from "../contexts/PopupContext";

export default function CreateNewOrder() {
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const { setContent } = usePopup();

  //form
  const [uuid, setUUID] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  // Fetching data from db
  const fetchCountries = async () => {
    try {
      const data = await dao.getCountry();
      // console.log("Data: " + data);

      setCountries(data);
      setContent({ isOpen: true, msg: "Successfully fetched orders" });
    } catch (error) {
      console.log(error);
      setContent({ isOpen: true, msg: `Can't fetch orders, ${error}` });
    }
  };

  const fetchOrderType = async () => {
    try {
      const data = await dao.getTypeOrder();
      //  console.log("Data: " + data);
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
  }, []); //has tried to use callback + set dependencies to solve the warning here but it slows down the app significantly

  const submitTask = async () => {
    const newOrder = {
      uuid: uuid, //hardcoded for test as backend route requires uuid, should be automatic
      pu_planned_time: date.slice(0, 19).replace("T", " "),
      order_type: type,
      pu_address: address,
      country_code: country,
    };

    //console.log(newOrder);
    //fetch, handdle response, show success message in a message flash
    //navigate("/")
    try {
      const res = await dao.saveOrder(newOrder);
      setContent({ isOpen: true, msg: `Order ${uuid} has been created!` });
      navigate("/");
    } catch (error) {
      setContent({ isOpen: true, msg: `Can't create the order, ${error}` });
    }
  };

  return (
    <div className="order">
      <Button variant="outlined" onClick={() => navigate("/")}>
        Cancel
      </Button>
      <Card className="card">
        <CardContent>
          <h2>Create a new order</h2>
          <FormLabel>UUID</FormLabel>
          <TextField
            margin="dense"
            fullWidth
            value={uuid}
            onChange={(e) => setUUID(e.target.value)}
            placeholder="Please enter a random string with maximum 24 characters for testing"
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
              {types.map((x) => (
                <MenuItem key={x.order_type} value={x.order_type}>
                  {x.order_type}
                </MenuItem>
              ))}
            </Select>
          )}

          <FormLabel>Country</FormLabel>
          {countries.length > 0 && (
            <Select
              defaultValue={countries[0].id}
              margin="dense"
              fullWidth
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((x) => (
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
            Create an order
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
