import { useState } from "react";
import Routes from "./Routes";
import "./App.css";
import UpBar from "./layout/UpBar";
import MemoryWallProvider from "./contexts/MemoryWallContexts";
import LoginPopUp from "./components/LoginPopUp";
//import { RefreshProvider } from "./contexts/RefreshContext";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="app">
      <MemoryWallProvider>
        <UpBar openLoginModal={handleModalOpen} />
        <LoginPopUp showModal={showModal} handleModalClose={handleModalClose} />
        <Routes />
      </MemoryWallProvider>
      <div style={{ backgroundColor: "#022855", height: "50px" }}></div>
    </div>
  );
}

export default App;
