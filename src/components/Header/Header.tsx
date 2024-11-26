import { AppBar, Avatar, Button } from "@mui/material";
import React, { FC, ReactElement, useContext } from "react";
import * as S from "./Header.ts";
import { User } from "../../types/users";
import { GlobalContext } from "../../context/GlobalContext.tsx";

interface HeaderProps {
  user: User;
  icon:ReactElement;
}


const Header: FC<HeaderProps> = ({ user, icon}) => {  
  return (
    <AppBar position="sticky">
      <S.HeaderContainer>
        <S.Profile ><S.userAvatar src={user?.image || "https://example.com/images/noa_cohen.jpg"} />
        { user.user_name }
        </S.Profile>
        {icon}
      </S.HeaderContainer>
    </AppBar>
  );
};
export default Header;
