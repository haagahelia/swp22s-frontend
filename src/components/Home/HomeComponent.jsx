import React from 'react';
import { Typography } from '@mui/material';
import Container from '../CommonComponents/Container';


function Home() {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Home
            </Typography>
            <div>Hello and welcome!</div>
        </Container>
    )
}

export default Home;