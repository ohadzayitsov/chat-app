import { FC, useContext } from 'react';
import { Message } from '../types/message.ts';
import * as S from './Message.ts'
import { GlobalContext } from '../context/GlobalContext.tsx';
import { Avatar } from '@mui/material';
import React from 'react';


interface MessageProps{
    message:Message;
}
const OneMessage:FC<MessageProps> =({message})=> {

const {connectedUser, member} = useContext(GlobalContext);
const defaultImage = "https://example.com/images/noa_cohen.jpg";

function formatMessageDateTime(dateTime: Date): string {
    const messageDate = new Date(dateTime);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = 
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear();

    const isYesterday = 
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear();

    const time = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) return `Today ${time}`;
    if (isYesterday) return `Yesterday ${time}`;

    const dayMonth = messageDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    return `${dayMonth} ${time}`;
}

return <S.ContainerMessage
$isConnectedUser={message.from === connectedUser.code}
>
<Avatar
  src={
    message.from === connectedUser.code
      ? connectedUser?.image || defaultImage
      : member?.image || defaultImage
  }
  alt="User Avatar"
/>
<div style={{display:"flex", flexDirection:"column", minWidth: "fit-content", }}>
<S.Message $isConnectedUser={message.from === connectedUser.code}>
  {message.text}
</S.Message>
<S.TimeStemp>{formatMessageDateTime(message.dateTime)}</S.TimeStemp>
</div>
</S.ContainerMessage>
}
export default OneMessage;