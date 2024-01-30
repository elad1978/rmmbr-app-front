import { useEffect, useState } from "react";
import React from "react";
import "./index.css";
import Dropdown from "react-bootstrap/Dropdown";

const ThreeDotsAdminDropdown = ({
  updateAboutInput,
  updateTitleInput,
  returnToDotsIcon,
}) => {
  const [toggleTitleInput, setToggleTitleInput] = useState(true);
  const [toggleAboutInput, setToggleAboutInput] = useState(true);

  useEffect(() => {
    setToggleTitleInput(!returnToDotsIcon);
  });
  const handleEditTitleClick = (bool) => {
    updateTitleInput(bool);
    setToggleTitleInput(!toggleTitleInput);
  };

  const handleEditAboutClick = (bool) => {
    updateAboutInput(bool);
    setToggleAboutInput(!toggleAboutInput);
  };

  return (
    <Dropdown>
      {toggleTitleInput ? (
        <Dropdown.Toggle
          variant="light"
          id="dropdown-menu"
          className="custom-dropdown-toggle"
        >
          <img className="three-dots" src="three-dotes.jpg" alt="Three Dots" />
        </Dropdown.Toggle>
      ) : (
        <span
          onClick={() => handleEditTitleClick(toggleTitleInput)}
          style={{ cursor: "pointer" }}
        >
          ✖
        </span>
      )}

      <Dropdown.Menu>
        <Dropdown.Item
          key={1}
          onClick={() => handleEditTitleClick(toggleTitleInput)}
        >
          {"עריכת כותרת"}
        </Dropdown.Item>
        <Dropdown.Item key={2}>{"עריכת תמונות"}</Dropdown.Item>
        <Dropdown.Item
          key={3}
          onClick={() => handleEditAboutClick(toggleAboutInput)}
        >
          {"עריכת אודות"}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ThreeDotsAdminDropdown;
