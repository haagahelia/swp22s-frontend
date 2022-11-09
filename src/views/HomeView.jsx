import React from 'react';
import Container from '../components/CommonComponents/Container';
import Home from '../components/Home/HomeComponent';
import { Typography } from '@mui/material';


function HomeView() {

    return (
        <Container>
        <Typography variant="h5" fontWeight="bold" my={2} color="primary">Home</Typography>
          <Home />  
        </Container>
    )
}

export default HomeView;