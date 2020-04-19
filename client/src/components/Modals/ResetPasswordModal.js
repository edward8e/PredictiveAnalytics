import React from "react";
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";

const ResetPasswordModal =({toggle, onToggle, onSubmit})=> {
    return (
      <Modal isOpen={toggle} toggle={onToggle} className="modal-warning">
        <ModalHeader toggle={onToggle}>Confirm Password Reset</ModalHeader>
        <ModalBody>
        An email will be sent to the account with a email reset link and you will be logged out.
          </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={onSubmit}>
          ResetPassword
            </Button>{" "}
          <Button
            color="secondary"
            onClick={onToggle}
          >
            Cancel
            </Button>
        </ModalFooter>
      </Modal>
    );
  }


export default ResetPasswordModal;
