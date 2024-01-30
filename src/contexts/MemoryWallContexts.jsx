// import React, { createContext, useState, useContext, useEffect } from "react";
// import { fetchDataFromDatabase } from "../services/apiFetcher.jsx";

// const memoryWallContext = createContext(null);

// export function useMemoryWallContext() {
//   return useContext(memoryWallContext);
// }

// export default function MemoryWallProvider({ children }) {
//   const [memoryWalls, setMemoryWalls] = useState(null);
//   useEffect(() => {
//     fetchDataFromDatabase("http://localhost:3000/api/memoryWall")
//       .then((data) => {
//         setMemoryWalls(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []); // The empty dependency array ensures that this effect runs only once on component mount
//   if (memoryWalls === null) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <memoryWallContext.Provider value={{ memoryWalls, setMemoryWalls }}>
//       {children}
//     </memoryWallContext.Provider>
//   );
// }

import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchDataFromDatabase } from "../services/apiFetcher.jsx";

const memoryWallContext = createContext(null);

export function useMemoryWallContext() {
  return useContext(memoryWallContext);
}

export default function MemoryWallProvider({ children }) {
  const [memoryWalls, setMemoryWalls] = useState(null);
  useEffect(() => {
    fetchDataFromDatabase("http://localhost:3000/api/memoryWall")
      .then((data) => {
        setMemoryWalls(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once on component mount
  if (memoryWalls === null) {
    return <div>Loading...</div>;
  }
  return (
    <memoryWallContext.Provider value={{ memoryWalls, setMemoryWalls }}>
      {children}
    </memoryWallContext.Provider>
  );
}
