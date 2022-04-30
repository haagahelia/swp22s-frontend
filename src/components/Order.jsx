import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment-mini'
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function Order({ order, setOrder }) {
    const navigate = useNavigate()

    const signOrder = () => {
        navigate(`/sign/${order.uuid}`)
        setOrder(order.uuid)
    }

    return (
        <div className="order">
            <button onClick={() => navigate("/")}>Go Back</button>
            <p>Country Code: {order.country_code}</p>
            <p>Order Type: {order.order_type}</p>
            <p>Pick-up Address: {order.pu_address}</p>
            <p>Planned Pick-up Time: {moment(order.pu_planned_time).format("DD-MM-YYYY HH:mm")}</p>
            {
                !order?.pu_signed_at  
                ? <button onClick={signOrder}>
                    <BorderColorIcon style={{ marginRight: 4, padding: "5 12" }} />
                    Sign Order
                </button>
                : <p>Signed At: {moment(order.pu_signed_at).format("DD-MM-YYYY HH:mm")}</p>
            }
        </div>
    )
}
