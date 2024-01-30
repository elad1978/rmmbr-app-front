import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "react-auth-kit";
import UsersProvider from "./contexts/UsersContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsersProvider>
      <AuthProvider authType={"localstorage"} authName={"_auth"}>
        <GoogleOAuthProvider clientId="736924489608-qhk4iru63h0522r5k7vmjgdoelagirg8.apps.googleusercontent.com">
          <Router>
            <App />
          </Router>
        </GoogleOAuthProvider>
      </AuthProvider>
    </UsersProvider>
  </React.StrictMode>
);
