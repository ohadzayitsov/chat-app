import React, { useContext, useState } from "react";
import * as S from "./Login.ts";
import { Button, TextField } from "@mui/material";
import { GlobalContext } from "../../context/GlobalContext.tsx";

const Login = () => {
  const { setConnectedUser,connectedUser, users } = useContext(GlobalContext);
  const [user, setUser] = useState({
    password: "",
    user_name: "",
  });
  const [isShowErrorLable, setIsShowErrorLable] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    if (!user.user_name || !user.password) {
      setIsShowErrorLable(true);
      return;
    }
    let userConnect = users.find(
      (userData) =>
        userData.password === user.password &&
        userData.user_name === user.user_name
    );
    if(userConnect) {
      setConnectedUser(userConnect) 
      localStorage.setItem("connectedUser", JSON.stringify(connectedUser));

    } else setIsShowErrorLable(true);
  };

  return (
    <S.LoginContainer>
        <div>wellcome to the chat</div>
      <S.Input
        required
        name="user_name"
        onChange={handleChange}
        label="user name"
      ></S.Input>
      <S.Input
        type="password"
        required
        name="password"
        onChange={handleChange}
        label="password"
      ></S.Input>
      {isShowErrorLable && (
        <S.ErrorLable>The username or password is incorrect</S.ErrorLable>
      )}
      <Button
        variant="contained"
        onClick={handleConfirm}
        disabled={!user.user_name || !user.password}
      >
        Login
      </Button>
    </S.LoginContainer>
  );
};
export default Login;
