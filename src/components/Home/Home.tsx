import React, { useContext, useEffect, useState } from "react";
import { User } from "../../types/users";
import { fetchJsonData } from "../../utils/jsonFunctions.tsx";
import { GlobalContext } from "../../context/GlobalContext.tsx";
import { Avatar, List, ListItemButton } from "@mui/material";


const Home = () =>{
const {connectedUser, setConnectedUser}=useContext(GlobalContext)
const [users, setUsers]= useState<User[]>([])
const [error, setError] = useState(null);


useEffect(() => {
    const fetchData = async () => {
        const usersData = await fetchJsonData("users");
        if (usersData) {
            setUsers(usersData);
        }
    };
    setConnectedUser({
        code:1,
        user_name:'noa_cohen',
        password:'password123',
        image:"https://example.com/images/noa_cohen.jpg"
    })
    fetchData();
}, []);

return <div>
    <List>
        <ListItemButton>
        <Avatar src={connectedUser.image}></Avatar>
        </ListItemButton>
    </List>
    </div>
}
export default Home;


