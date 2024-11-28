import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home.tsx";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext.tsx";
import MessagePage from "./components/MessagesPage/MessagesPage.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { loadFromDB, saveToDB } from "./utils/jsonFunctions.tsx";
import Login from "./components/Login/Login.tsx";
function App() {
  const { connectedUser, setConnectedUser, setUsers, setMessages } =
    useContext(GlobalContext);
    
    //comment maybe initialize in useEffect
    //should have saved connected user in sessionStorage ,so you can log in to different users in different tabs
  const [connectedUserState] = useState(() => {
    const savedUser = localStorage.getItem("connectedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const RoutesMaster = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/chat/:user",
      component: <MessagePage />,
    },
  ];

  useEffect(() => {
    const loadFiles = async () => {
      const usersData = await loadFromDB("users");
      if (usersData) {
        setUsers(usersData);
      } else {
        fetch("Data/users.json")
          .then((response) => response.json())
          .then(async (json) => {
            setUsers(json);
            await saveToDB("users", json);
          })
          .catch((error) => console.error("Error loading users:", error));
      }

      const savedFile2 = await loadFromDB("messages");
      if (savedFile2) {
        setMessages(savedFile2);
      } else {
        fetch("Data/messages.json")
          .then((response) => response.json())
          .then(async (json) => {
            setMessages(json);
            await saveToDB("messages", json);
          })
          .catch((error) => console.error("Error loading messages:", error));
      }
    };
    loadFiles();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("connectedUser");
    if (savedUser) {
      console.log("Loaded user from localStorage:", savedUser);
      setConnectedUser(JSON.parse(savedUser));
    } else {
      console.log("No connectedUser found in localStorage.");
    }
  }, []);

  //comment unnecessary useEffect
  useEffect(() => {
    if (connectedUserState) {
      setConnectedUser(connectedUserState);
    }
  }, [connectedUserState]);

  useEffect(() => {
    if (connectedUser) {
      localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
      console.log("Saved connectedUser to localStorage:", connectedUser);
    }
  }, [connectedUser]);

  return (
    <div className="App">
      {Object.keys(connectedUser).length === 0 ? (
        <Login />
      ) : (
        <BrowserRouter>
          <Routes>
            {RoutesMaster.map((routeElement) => (
              <Route
                key={routeElement.path}
                path={routeElement.path}
                element={routeElement.component}
              />
            ))}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
