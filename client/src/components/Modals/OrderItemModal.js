import React from "react";
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { formatMoney } from '../../utils';
import RenderCounterSquare from "../../views/Forms/FormComponents/RenderCounterSquare";
import renderInput from '../../views/Forms/FormComponents/renderInput';

const schema = yup.object({
    amount: yup.number().required()
});

const OrderItemModal = ({ toggle, onToggle, onSubmit, item }) => {
    const { itemName, description, price } = item;
    return (
        <Modal isOpen={toggle} toggle={onToggle}>
            <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
                amount: "",
                note: ""
            }}>
                {({ handleSubmit, values }) => <Form noValidate onSubmit={handleSubmit}>
                    <ModalHeader toggle={onToggle} ><span style={{ fontWeight: 700, fontSize: "1.5rem" }}>{itemName.toUpperCase()}</span></ModalHeader>
                    <ModalBody>
                        <h5 className="text-muted" style={{paddingBottom:"40px"}}>{description}</h5>
                        <Field
                            name="note"
                            label="Special Instructions"
                            type="textarea"
                            rows={3}
                            component={renderInput}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Field
                            name="amount"
                            type="text"
                            component={RenderCounterSquare}
                        />
                        <Button style={{ width: "100%", height: "50px" }} block color="success" className="btn-square" type="submit">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
                                <h6 style={{ margin: "0px" }}>ADD TO ORDER</h6>
                                <h6 style={{ margin: "0px" }}>{formatMoney(values.amount * price)}</h6>
                            </div>
                        </Button>
                    </ModalFooter>
                </Form>}
            </Formik>
        </Modal>
    );
}


export default OrderItemModal;
