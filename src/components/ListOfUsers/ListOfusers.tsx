import { Avatar, List, ListItemButton, ListItemText } from "@mui/material";
import * as S from "./ListOfUsers.ts";
import React, { FC, useContext } from "react";
import { User } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext.tsx";

interface ListOfUsersAtytributs {
  users: User[];
}

const ListOfUsers: FC<ListOfUsersAtytributs> = ({ users }) => {
  const { fachMemeber } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleNavigation = async (user: User) => {
    navigate(`/chat/${user?.code}`);
    fachMemeber()
  };

  return (
    <List>
      {users.map((user) => (
        <ListItemButton onClick={() => handleNavigation(user)}>
          {user?.image && <Avatar src={user?.image}></Avatar>}
          <S.Text>{user?.user_name}</S.Text>
        </ListItemButton>
      ))}
    </List>
  );
};
export default ListOfUsers;
