import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { cancelOrder } from "../../actions";

const CancelOrderModal =({toggle, onToggle, order:{_id}})=> {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async () => {
    await dispatch(cancelOrder({_id}));
    onToggle();
    history.push('/dashboard/order/past');
    console.log("submitted")
}
    return (
      <Modal isOpen={toggle} toggle={onToggle} className="modal-danger">
        <ModalHeader toggle={onToggle}>Are you sure you want to cancel/decine the order?</ModalHeader>
        <ModalBody>
          This will cancel the current order and the payment will cancel.
          </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onSubmit}>
            Cancel Order
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


export default CancelOrderModal;
