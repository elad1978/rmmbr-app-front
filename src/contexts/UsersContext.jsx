import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchDataFromDatabase } from "../services/apiFetcher.jsx";

const usersContext = createContext();

export function useUsersContext() {
  return useContext(usersContext);
}

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetchDataFromDatabase("http://localhost:3000/api/users")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once on component mount
  if (users === null) {
    return <div>Loading...</div>;
  }
  return (
    <usersContext.Provider value={{ users, setUsers }}>
      {children}
    </usersContext.Provider>
  );
}
