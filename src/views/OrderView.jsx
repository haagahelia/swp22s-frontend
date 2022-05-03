import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment-mini'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { 
    Card,
    Button,
    CardContent,
    CardActions
} from '@mui/material';

import { useOrder } from '../contexts/OrderContext';

export default function OrderView() {
    const navigate = useNavigate()
    const { order, setOrder } = useOrder()

    const signOrder = () => {
        navigate(`/sign/${order.uuid}`)
        setOrder(order.uuid)
    }

    return (
        <div className="order">
            <Button variant="outlined" onClick={() => navigate("/")}>Go Back</Button>

            <Card className="card">
                <CardContent>
                    <h3>{order.uuid}</h3>
                    <p>Country Code: {order.country_code}</p>
                    <p>Order Type: {order.order_type}</p>
                    <p>Pick-up Address: {order.pu_address}</p>
                    <p>Planned Pick-up Time: {moment(order.pu_planned_time).format("DD-MM-YYYY HH:mm")}</p>
                    {
                        order?.pu_signed_at ? <p>Signed At: {moment(order.pu_signed_at).format("DD-MM-YYYY HH:mm")}</p> : null
                    }
                </CardContent>

                <CardActions>
                    {
                        !order?.pu_signed_at &&
                        <Button variant="outlined" size="small" onClick={signOrder}>
                            <BorderColorIcon className="icon" />
                            Sign Order
                        </Button>
                    }
                </CardActions>
            </Card>
        </div>
    )
}
