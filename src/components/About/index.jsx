import React from "react";
import "./index.css";

const About = ({ about }) => {
  return (
    <div className="about-container">
      <p>{about}</p>
    </div>
  );
};

export default About;
