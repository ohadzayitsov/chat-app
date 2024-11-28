import { createContext, useEffect, useState } from "react";
import { User } from "../types/users";
import React from 'react';
import { Message } from "../types/message";
import { findInDB } from '../utils/jsonFunctions.tsx';


interface GlobalContextProps {
  connectedUser: User ;
  setConnectedUser: React.Dispatch<React.SetStateAction<User>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  member: User ;
  setMember: React.Dispatch<React.SetStateAction<User>>;
  messages: Message[] ;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  fachMemeber: () => void;
}
//comment alot of data to have in one context, maybe split to userContext,messageContext ...
export const GlobalContext = createContext({} as GlobalContextProps);

export default function GlobalContextProvider(props: any) {
  const [connectedUser, setConnectedUser] = useState<User>({} as User);
  const [users, setUsers] = useState<User[]>([] as User[] )
  const [member, setMember] = useState<User>({} as User )
  const [messages, setMessages] = useState<Message[]>([] as Message[] )
  

  const getPathSegment = (index) => {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[index] || null; // Returns null if the segment doesn't exist
  };
  
  //comment member id shouldn't be in url, can be simplified so that when the user selects a chat in ListOfUsers ,set the member as the selected user
  async function fachMemeber() {
    const pathSegments = getPathSegment(2);
    if (pathSegments) {
      const results = await findInDB('users', (item) => item.code === Number(getPathSegment(2)));
      setMember(results[0])
    }
    }

  

  const value = {
    connectedUser,
    setConnectedUser,
    users,
    setUsers,
    member,
    setMember,
    messages,
    setMessages,
    fachMemeber
  };


  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
