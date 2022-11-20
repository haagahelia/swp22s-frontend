import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';


export function LogIn() {

    const[user, setUser]=React.useState({
        email:'',
        password:''
    });

    const handleSave= async (user) => {
            //dao manage Login
        
        setUser({
            email:'',
            password:'',
        })
    }

    const inputChanged=(event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    }

    return (

        <div style={{paddingInline:'30%'}}>

        <Typography
            paddingTop={5}
            paddingBottom={2}
            align="center"
            variant="h4"
            noWrap
            component="div"
            sx={{ flex: 1 }}>
            Log In
          </Typography>



          <TextField
            margin="dense"
            name='email'
            value={user.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='password'
            type="password"
            value={user.password}
            onChange={inputChanged}
            label="password"
            fullWidth
            variant="standard"
          />

          <div style={{paddingTop:'50px'}}>
            <Button fullWidth variant="contained" onClick={handleSave}endIcon ={<LoginIcon />}>
             Log in 
            </Button> 
          </div>
          </div>

         )
}
