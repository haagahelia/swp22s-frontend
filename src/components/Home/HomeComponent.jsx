import React from "react";
import { Typography } from "@mui/material";

import Button from "@mui/material/Button";
import CarrierView from "../CarrierView/CarrierView";
import AdminView from "../AdminView/AdminView";
import TaskPlanner from "../TaskPlanner/TaskPlanner";
import Clock from "../CommonComponents/Clock";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div>Hello {user.firstName} !</div>
      <div>You are {user.role}</div>
      <div>Current time is: <Clock /></div> 
      {user.role === "admin" || user.role === "taskplanner" ? (
        <AdminView />
      ) : (
        <CarrierView />
      )}
    </div>
  );
}

export default Home;
