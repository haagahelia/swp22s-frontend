import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import dao from '../../ajax/dao';
import jwtDecode from 'jwt-decode'

export function LogIn() {
  const navigate = useNavigate();
  
  const[user, setUser]=React.useState({
      email:'',
      pword:''
  });

  const handleSave= async () => {

      try{
      const res= await dao.logIn(user);
      const token =res.data.token;
      const decodedUser = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(decodedUser));

      //navigate("/orders");
    }
    catch{}
    setUser({
      email:'',
      pword:'',
  })
  }

  const inputChanged=(event)=>{
      setUser({...user, [event.target.name]: event.target.value});
  }

  return (

    <div style={{paddingInline:'33%'}}>

      <Typography
          paddingTop={5}
          paddingBottom={2}
          align="center"
          variant="h4">
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
          name='pword'
          type="password"
          value={user.pword}
          onChange={inputChanged}
          label="Password"
          fullWidth
          variant="standard"
        />

        <div style={{paddingTop:'50px', paddingInline:'15%'}}>
          <Button fullWidth variant="contained" onClick={handleSave}endIcon ={<LoginIcon />}>
            Log in 
          </Button> 
      </div>
        
    </div>

  )
}
