import React from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CategoryForm from '../../views/Forms/CategoryForm/CategoryForm';


const UpdateCategoryModal =({ toggle, onToggle, category })=> {
        return <Modal isOpen={toggle} toggle={onToggle} className="modal-info">
            <ModalHeader toggle={onToggle}>Update Category</ModalHeader>
            <ModalBody>
                <CategoryForm toggle={onToggle} initialValues={category} formType="update" />
            </ModalBody>
        </Modal>
    
}

export default UpdateCategoryModal;