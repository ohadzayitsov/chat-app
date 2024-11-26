import { TextField } from "@mui/material"
import React, { useContext, useRef, useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import * as S from "./BannerSend.style.ts"
import { GlobalContext } from "../../context/GlobalContext.tsx";
import { Message } from "../../types/message.ts";
import { appendToDB, setToDB } from "../../utils/jsonFunctions.tsx";

const BannerSend = () =>{
const {setMessages, member, connectedUser,messages} = useContext(GlobalContext);
const [inputValue, setInputValue] =useState("");

const heandleConfrim =async ()=>{
     const newMessage:Message = {
          from: connectedUser.code,
          to: member.code,
          text: inputValue,
          dateTime: new Date()
     }
     if (!messages || messages.length === 0) {
          await setToDB('messages', [newMessage]);
     }else{
          await appendToDB('messages', newMessage);}
          
     setMessages((prevMessages: any[]) => [...prevMessages, newMessage]);
     setInputValue("");
}


return <div style={{display:"flex", alignSelf:"flex-end", alignItems: "center",justifyContent:"center",width:"100%",position:"sticky" }}>
     <S.InputText
          id="outlined-multiline-flexible"
          multiline
          maxRows={2}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <SendIcon onClick={heandleConfrim}  color="primary"/>
     </div>
}
export default BannerSend