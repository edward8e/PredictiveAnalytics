import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { forceComplete } from "../../actions";

const ConfirmCompleteModal =({toggle, onToggle, order:{_id}})=> {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async () => {
    await dispatch(forceComplete({_id}));
    onToggle();
    history.push('/dashboard/order/past');
    console.log("submitted")
}
    return (
      <Modal isOpen={toggle} toggle={onToggle} className="modal-success">
        <ModalHeader toggle={onToggle}>Are you sure you want to force complete this order?</ModalHeader>
        <ModalBody>
          This will force the order as complete for your records
          </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={onSubmit}>
            Force Complete
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


export default ConfirmCompleteModal;
