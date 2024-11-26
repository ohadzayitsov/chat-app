import { TextField } from "@mui/material";
import styled from "styled-components";

export const LoginContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding:20px;
justify-content: center;
gap:10px;
height: 100vh;
margin:auto;
position: relative; 
`

export const Input =styled(TextField)`
margin: 10px;
`
export const ErrorLable = styled.div`
color: red;
`