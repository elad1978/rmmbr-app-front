import React, { useEffect, useState } from "react";
import "./index.css";
import { useSignIn } from "react-auth-kit";
import { useGoogleLogin } from "@react-oauth/google";
import { useUsersContext } from "../../contexts/UsersContext.jsx";

import axios from "axios";

const LogInGoogle = () => {
  const signIn = useSignIn();

  const { users } = useUsersContext();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleUserData = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        console.log(googleUserData);
        const dbUserData = users.find(
          (user) => user.email === googleUserData.data.email
        );
        signIn({
          expiresIn: tokenResponse.expires_in,
          // given_name: userData.data.given_name,
          tokenType: "Bearer",
          token: tokenResponse.access_token,
          authState: {
            email: googleUserData.data.email,
            name: googleUserData.data.given_name,
            imgPath: googleUserData.data.picture,
            googleId: googleUserData.data.sub,
            dbUserId: dbUserData.id,
            connectionType: "google",
            role: dbUserData.role,
            permissions: dbUserData.permissions,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="login">
      <div className="google-login-btn-container">
        <button className="google-login-btn" type="button" onClick={login}>
          <img
            className="google-logo"
            src="google-logo-png-29534.png"
            alt="google logo"
          />
          <span>התחבר\י באמצעות גוגל</span>
        </button>
      </div>
    </div>
  );
};

export default LogInGoogle;
