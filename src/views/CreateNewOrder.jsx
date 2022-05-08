import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    Button,
    CardContent,
    CardActions, Select, MenuItem, FormLabel
} from '@mui/material';
import { TextField } from '@mui/material';
import dao from '../ajax/dao';

import { usePopup } from "../contexts/PopupContext"

export default function CreateNewOrder() {
    const navigate = useNavigate()

    const [types, setTypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const { setContent } = usePopup()

    // Fetching data from db 
    const fetchCountries = async () => {
        try {
            const data = await dao.getCountry();
            // console.log("Data: " + data);

            setCountries(data)
            setContent({ isOpen: true, msg: "Successfully fetched orders" })
        } catch (error) {
            console.log(error);
            setContent({ isOpen: true, msg: `Can't fetch orders, ${error}` })
        }
    };

    const fetchOrderType = async () => {
        try {
            const data = await dao.getTypeOrder();
            //  console.log("Data: " + data);

            setTypes(data)
            setContent({ isOpen: true, msg: "Successfully fetched types" })
        } catch (error) {
            console.log(error);
            setContent({ isOpen: true, msg: `Can't fetch types, ${error}` })
        }
    };

    useEffect(() => {
        fetchCountries();
        fetchOrderType();
    }, [])

    const submitTask = () => {
        console.log("Create task");
        //fetch, handdle response, show success message in a message flash 
        //navigate("/")
    }



    return (
        <div className="order">
            <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
            <Card className="card">
                <CardContent>
                    <h2>Create a new order</h2>
                    <FormLabel>Address</FormLabel>
                    <TextField margin="dense" fullWidth />
                    <FormLabel>Order type</FormLabel>
                    {
                        types.length > 0 &&
                        <Select defaultValue={types[0].order_type} margin="dense" fullWidth label="Type">
                            {types.map(x => <MenuItem key={x.order_type} value={x.order_type}>{x.order_type}</MenuItem>)}
                        </Select>
                    }

                    <FormLabel>Country</FormLabel>
                    {
                        countries.length > 0 &&
                        <Select defaultValue={countries[0].id} margin="dense" fullWidth label="Country">
                            {countries.map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>)}
                        </Select>
                    }
                    <FormLabel>Date of pick up</FormLabel>
                    <TextField margin="dense" fullWidth type="datetime-local" />
                </CardContent>

                <CardActions>
                    <Button variant="outlined" size="small" onClick={submitTask}>
                        Create an order
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
