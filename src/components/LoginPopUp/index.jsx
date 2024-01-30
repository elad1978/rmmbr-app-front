import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import "./index.css";
import LogInGoogle from "../LogInGoogle";
import LogInFacebook from "../LogInFacebook";
import LogInForm from "../logInForm";

function LoginPopUp({ handleModalClose, showModal }) {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      handleModalClose();
    }
  });

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0)", borderRadius: "25%" }}
      >
        <Modal.Body style={{ borderRadius: "25%" }}>
          <LogInForm handleModalClose={handleModalClose} />
          <LogInGoogle />
          <LogInFacebook />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPopUp;
