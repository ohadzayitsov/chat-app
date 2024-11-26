import React, { useContext, useEffect, useState } from "react";
import { User } from "../../types/users";
import { GlobalContext } from "../../context/GlobalContext.tsx";
import { Avatar, List, ListItemButton, ListItemText } from "@mui/material";
import Header from "../Header/Header.tsx";
import ListOfUsers from "../ListOfUsers/ListOfusers.tsx";
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const { connectedUser, setConnectedUser, users, setUsers } = useContext(GlobalContext);

  const handleLogout = () => {
    console.log("Clearing user from localStorage.");
    setConnectedUser({} as User);
    localStorage.removeItem("connectedUser");
  };
  return (
    <div>
      <Header user={connectedUser} icon={<LogoutIcon onClick={handleLogout} />} />
      <ListOfUsers users={users.filter((user) => user.code != connectedUser.code)} />
    </div>
  );
};
export default Home;
