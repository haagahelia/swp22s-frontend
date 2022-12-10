import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Container, Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const time = new Date();

  function getCurrentTime() {

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `Current time is: ${hours}:${minutes}:${seconds}`;
  };

  return (
    <AppBar position="static" style={{ background: "white", height: 55 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            marginTop: 1.2,
            justifyContent: "center",
          }}
        >
          {user?.role === "admin" ? (
            <nav>
              <Button onClick={() => navigate("/")}>Home</Button>
              <Button onClick={() => navigate("/orders")}>Orders</Button>
              <Button onClick={() => navigate("/unsigned")}>
                Unsigned Orders
              </Button>
              <Button onClick={() => navigate("/unsignedtimelimit")}>
                Timed out Orders
              </Button>
              <Button onClick={() => navigate("/signatures")}>
                Signatures
              </Button>
              <Button onClick={() => navigate("/new")}>
                Create a new order
              </Button>
              <Button
                variant="contained"
                endIcon={<LogoutIcon />}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Log Out
              </Button>
            </nav>
          ) : (
            <nav>
              <Button onClick={() => navigate("/")}>Home</Button>
              <Button onClick={() => navigate("/orders")}>
                Orders History
              </Button>
              <Button
                variant="contained"
                endIcon={<LogoutIcon />}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Log Out
              </Button>
            </nav>
          )}
        </Box>
      </Container>
    </AppBar>
  );
}
