import React from "react";
import { useLocation } from "react-router-dom";
//import DeceasedCard from "./../../components/DeceasedCard/index";

const DeceasedDetails = () => {
  const location = useLocation();
  const deceased = location.state?.deceased || null;
  return (
    <>
      <h1>DonorDetails</h1>
      <h3>{deceased.name}:שם</h3>
      <h3>{deceased.donationAmount} :סכום תרומה</h3>
    </>
  );
};

export default DeceasedDetails;
