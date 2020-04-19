import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as yup from "yup";
import { restaurantAddress } from '../../utils';
import RenderAddress from '../../views/Forms/FormComponents/RenderAddress';
import { selectedDeliveryAddress } from '../../actions';

const DeliveryModal = ({ toggle, onToggle }) => {
    const dispatch = useDispatch();
    const { setFieldValue, validateForm, values } = useFormikContext();
    const settings = useSelector(state => state.business.settings);
    const cart = useSelector(state=>state.cart);
    const schema = yup.object({
        address: yup.object({
            formatted_address: yup.string().required(),
            distance: yup.number().max(settings.deliveryDistance).required()
        })
    });
    const onSubmit = ({address}) => {
        dispatch(selectedDeliveryAddress(address));
        setFieldValue("address", address)
        onToggle();
    }
    if(values.cateringType === "Pickup" && values.address !== restaurantAddress){
        setFieldValue("address", restaurantAddress)
    }

    const onCancel = () => {
        setFieldValue("cateringType", "Pickup")
        validateForm()
        dispatch(selectedDeliveryAddress(restaurantAddress));
        onToggle();
    }
    return (
        <Modal isOpen={toggle} toggle={onCancel}>
            <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
                address: null
            }}>
                {({ handleSubmit, values, isValid }) => <Form noValidate onSubmit={handleSubmit}>
                    <ModalHeader toggle={onCancel} ><span style={{ fontWeight: 700, fontSize: "1.5rem" }}>Delivery Address</span></ModalHeader>
                    <ModalBody>
                        <Field
                            name="address"
                            component={RenderAddress}
                            maxDistance={settings.deliveryDistance}
                        />
                        <Button disabled={Boolean(values.address) ? !isValid : true} type="submit" block color="success" style={{ marginTop: "20px", height: "45px" }}>SUBMIT</Button>
                    </ModalBody>
                </Form>}
            </Formik>
        </Modal>
    );
}


export default DeliveryModal;
