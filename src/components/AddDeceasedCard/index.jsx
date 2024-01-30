import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DeceasedForm from "../DeceasedForm";

function AddDeceasedCard({
  handleClose,
  memoryWallId,
  onCancel,
  addNewDeceasedCardToMemoryWall,
}) {
  const [show, setShow] = useState(true);
  console.log(memoryWallId);
  return (
    <div>
      <Modal
        style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title className="modal-title">הוספת כרטיס חדש</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeceasedForm
            isNewCard={true}
            memoryWallId={memoryWallId}
            onCancel={onCancel}
            addNewDeceasedCardToMemoryWall={addNewDeceasedCardToMemoryWall}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddDeceasedCard;
