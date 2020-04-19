import React, { useState } from 'react';
import { Container, Popover, PopoverBody, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ThisOrThatRender from '../../Forms/FormComponents/ThisOrThatRender';
import RenderDatePicker from '../../Forms/FormComponents/RenderDatePicker';
import RenderNativeSelectSimple from '../../Forms/FormComponents/RenderNativeSelectSimple';
import { cartAddCateringInfo, selectedDeliveryAddress } from '../../../actions';
import { restaurantAddress, getMinDate, getDate, formatAMPM, timeOptions } from '../../../utils/Utils';
import DeliveryModal from '../../../components/Modals/DeliveryModal';

const schema = yup.object({
    amount: yup.number().required()
});

const OrderBar = ({ onSubmit, fixed }) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [togglePop, setTogglePop] = useState(false);
    const [toggleDelivery, setToggleDelivery] = useState(false);

    const syncCart = (formValues) => {
        if (formValues.cateringType === "Pickup" && cart.address !== restaurantAddress) {
            dispatch(selectedDeliveryAddress(restaurantAddress))
        }
        if (formValues.cateringType === "Delivery" && cart.address === restaurantAddress) {
            setToggleDelivery(true);
        }
        if (cart.info !== formValues) {
            dispatch(cartAddCateringInfo(formValues));
        }
    }

    return <div style={{ position: fixed && "fixed", top: "53px", backgroundColor: "white", left: 0, right: 0, zIndex: 1 }}>
        <Container style={{ padding: !fixed && "0px" }}>

            <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
                cateringType: cart.info.cateringType == null ? "Pickup" : cart.info.cateringType,
                date: cart.info.date == null ? getMinDate() : cart.info.date,
                time: cart.info.time == null ? "Mon Jan 1 2020 9:00:00 GMT-0800 (Pacific Standard Time)" : cart.info.time,
                address: cart.info.address == null ? { ...restaurantAddress, ...{ distance: 0 } } : cart.info.address,
                utensils: cart.info.utensils == null? "": cart.info.utensils,
                notes: cart.info.notes == null? "": cart.info.notes
            }}>
                {({ handleSubmit, values }) => {
                    const onCancel = () => {

                    }
                    return <Form noValidate onSubmit={handleSubmit} onChange={syncCart(values)} style={{ display: 'flex', flexDirection: !fixed && "column", alignItems: "center", borderBottom: "1px solid #CCC", borderTop: "1px solid #CCC", padding: "10px 0px" }}>
                        <Field
                            name="cateringType"
                            type="text"
                            options={["Pickup", "Delivery"]}
                            component={ThisOrThatRender}
                        />
                        <div style={{ padding: "0px 8px", fontWeight: 600 }} className="text-muted">for</div>
                        <Button id="Popover1" outline color="success" style={{ color: "black" }} onClick={() => setTogglePop(!togglePop)}>
                            <div style={{ display: "flex", alignItems: "center" }}><i className="icon-calendar icons d-block" style={{ paddingRight: "5px" }}></i>
                                {getDate(values.date)}{" @ "}{formatAMPM(values.time)}</div>

                        </Button>
                        <div style={{ padding: "0px 8px", fontWeight: 600 }} className="text-muted">at</div>
                        <div>{values.address.formatted_address}</div>
                        <Popover placement="bottom" isOpen={togglePop} target='Popover1' toggle={() => setTogglePop(!togglePop)} trigger="legacy" delay={0}>
                            <PopoverBody style={{ padding: "20px 12px" }}>
                                <h6>Select a {values.cateringType} Date</h6>
                                <Field
                                    name="date"
                                    component={RenderDatePicker}
                                />

                                <h6 style={{ marginTop: "10px" }}>Select a {values.cateringType} Time</h6>
                                <Field
                                    name="time"
                                    options={timeOptions}
                                    component={RenderNativeSelectSimple}
                                />
                            </PopoverBody>
                        </Popover>
                        <DeliveryModal toggle={toggleDelivery} onToggle={() => setToggleDelivery(!toggleDelivery)} />
                    </Form>
                }}
            </Formik>
        </Container>
    </div>
}

export default OrderBar;