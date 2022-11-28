import React from 'react';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

function Home() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <div>Hello {user.firstName} !</div>
            <div>You are {user.role}</div>
            <h1></h1>
            <Button variant="contained" endIcon ={<LogoutIcon />}
                    onClick={() =>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.reload();      
                    }}>Log Out</Button>
        </div>
    )
}

export default Home;