import React from "react"
import { useNavigate } from "react-router-dom"
import {
    AppBar,
    Container,
    Box,
    Button
} from "@mui/material"

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <AppBar position="static" style={{ background: "white", height: 55 }}>
            <Container maxWidth="xl">
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginTop: 1.2, justifyContent: "center" }}>
                    <nav>
                        <Button onClick={() => navigate("/")}>Home</Button>
                        <Button onClick={() => navigate("/unsigned")}>Unsigned Orders</Button>
                        <Button onClick={() => navigate("/signatures")}>Signatures</Button>
                    </nav>
                </Box>
            </Container>
        </AppBar>
    )
}
