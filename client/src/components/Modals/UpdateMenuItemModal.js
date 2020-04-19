import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MenuItemForm from "../../views/Forms/MenuItemForm/MenuItemForm";

const UpdateMenuItemModal = ({ toggle, onToggle, menuItem }) => {
  return <Modal isOpen={toggle} toggle={onToggle} className="modal-info">
    <ModalHeader toggle={onToggle}>Update Menu Item</ModalHeader>
    <ModalBody>
      <MenuItemForm toggle={onToggle} initialValues={menuItem} formType="update" />
    </ModalBody>
  </Modal>
}

export default UpdateMenuItemModal;
