import { createContext, useEffect, useState } from "react";
import { User } from "../types/users";
import React from 'react';


interface GlobalContextProps {
  connectedUser: User ;
  setConnectedUser: React.Dispatch<React.SetStateAction<User>>;
}

export const GlobalContext = createContext({} as GlobalContextProps);

export default function GlobalContextProvider(props: any) {
  const [connectedUser, setConnectedUser] = useState<User>({} as User);

  const value = {
    connectedUser,
    setConnectedUser,
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
