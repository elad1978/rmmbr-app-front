import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";

const UpBar = (props) => {
  const [isLogged, setIsLogged] = useState(false);

  const singOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const [profileImagePath, setProfileImagePath] = useState(""); // בשביל תמונת הפרופיל
  const authUser = useAuthUser();

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLogged(true);
      if (authUser().imgPath != null && authUser().imgPath != undefined) {
        setProfileImagePath(authUser().imgPath);
      }
    }
  });

  const handleLoginToggle = () => {
    if (isLogged) {
      singOut();
      localStorage.clear();
      setIsLogged(false);
      if (authUser().connectionType == "facebook") {
        FB.logout(function (response) {
          if (response.status === "unknown") {
          }
        });
      }
    } else {
      props.openLoginModal();
    }
  };

  return (
    <div className="up-bar">
      <Link to="/memory-page-form">
        <button className="up-bar-btns memory-btn">צור דף זיכרון+</button>
      </Link>

      {isLogged ? (
        <div to="" onClick={handleLoginToggle}>
          <button className="btns up-bar-btns profile-btn">
            <div className="profile-img-container">
              <img
                src={profileImagePath}
                alt="תמונת פרופיל"
                className="profile-img"
              />
            </div>
          </button>
        </div>
      ) : (
        <div to="" onClick={handleLoginToggle}>
          <button className="btns up-bar-btns"> התחבר/י</button>
        </div>
      )}

      <button className="btns srch-btn">
        <img src="searchIcon.png" alt="search icon" />
      </button>
      <Link to="/" className="logo">
        <img
          src="https://remember.bio/wp-content/uploads/2022/03/%D7%9C%D7%95%D7%92%D7%95-%D7%98%D7%95%D7%91.svg"
          alt=""
          className="logo"
        />
      </Link>
    </div>
  );
};
export default UpBar;
