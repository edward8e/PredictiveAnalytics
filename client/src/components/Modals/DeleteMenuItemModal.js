import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { deleteMenuItem } from "../../actions";

const DeleteMenuItemModal = ({ menuItem: { _id }, toggle, onToggle }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async () => {
    await dispatch(deleteMenuItem({ _id }));
    onToggle();
    history.push('/dashboard/menu');
  }

  return (
    <Modal isOpen={toggle} toggle={onToggle} className="modal-danger">
      <ModalHeader toggle={onToggle}>Are you sure you want to delete this item?</ModalHeader>
      <ModalBody>
        This is will be your final chance to decline before the item is
        deleted forever.
          </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onSubmit}>
          Delete
            </Button>
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


export default DeleteMenuItemModal;
