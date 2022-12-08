import React from 'react'
import OrdersView from '../../views/OrdersView'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import './AdminView.css'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const AdminView = () => {
    const navigate = useNavigate();
    return (
        <div className='AdminView'>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Total orders:
                    </Typography>
                    <Typography variant="body2">
                        data from orders table
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("/orders")}>Orders</Button>
                </CardActions>
            </Card>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Total unsigned orders:
                    </Typography>
                    <Typography variant="body2">
                        data from unsigned  orders table
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("/unsigned")}>Unsigned orders</Button>
                </CardActions>
            </Card>


            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Total time out orders:
                    </Typography>
                    <Typography variant="body2">
                        data from time out orders table
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("/unsignedtimelimit")}>time out orders</Button>
                </CardActions>
            </Card>


            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Total signatures:
                    </Typography>
                    <Typography variant="body2">
                        data from signatures table
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("/signatures")}>signatures</Button>
                </CardActions>
            </Card>

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Create a new order
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate("/new")}>Create new order</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default AdminView