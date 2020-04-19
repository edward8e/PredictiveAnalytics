import React, { useState, useEffect } from 'react';
import { Container, Popover, PopoverBody, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ThisOrThatRender from '../../Forms/FormComponents/ThisOrThatRender';
import RenderDatePicker from '../../Forms/FormComponents/RenderDatePicker';
import RenderNativeSelectSimple from '../../Forms/FormComponents/RenderNativeSelectSimple';
import renderInput from '../../Forms/FormComponents/renderInput';
import { cartAddCateringInfo, selectedDeliveryAddress } from '../../../actions';
import { restaurantAddress, getMinDate, getDate, formatAMPM, timeOptions } from '../../../utils/Utils';
import DeliveryModal from '../../../components/Modals/DeliveryModal';

const schema = yup.object({
    // utensils: yup.bool().required()
});

const OrderBar = ({ onSubmit, innerRef }) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 770 });
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

    return <div style={{ backgroundColor: "white" }}>


        <Formik validationSchema={schema} innerRef={innerRef} onSubmit={onSubmit} initialValues={{
            cateringType: cart.info.cateringType,
            date: cart.info.date,
            time: cart.info.time,
            address: cart.info.address,
            utensils: cart.info.utensils,
            notes: cart.info.notes
        }}>
            {({ handleSubmit, values }) => {
                const onCancel = () => {

                }
                return <Form noValidate onSubmit={handleSubmit} onChange={syncCart(values)} style={{ display: 'flex', flexDirection: "column", padding: "10px 0px" }}>
                    <div style={{ display: "flex",flexDirection:isTabletOrMobile&& "column", alignItems: "center", marginBottom: "25px" }}>
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
                    </div>

                    <div style={{ border: "1px solid #CCC", padding: "15px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "25px" }}>
                        <div>
                            <h6 className="text-muted">{cart.info.cateringType.toUpperCase()} ADDRESS</h6>
                            <div>{values.address.formatted_address}</div>
                        </div>
                        {cart.info.cateringType === "Delivery" && <div onClick={() => setToggleDelivery(!toggleDelivery)} style={{ color: "green", fontWeight: 600 }}>CHANGE</div>}

                    </div>
                    {/* <h4 style={{ marginBottom: "25px" }}>Additional Options</h4> */}

                    <h6>Please Note that your order includes a service charge.</h6>
                    <p style={{ marginBottom: "0px" }}>The service charge covers all utensils, plates, cups, etc. that is associated with the order as well as any additonal handling of the food items. at a rate of 18.0%</p>
                    <p className="text-muted">(Service charge is based on items charges prior to taxes.)</p>
                    {/* <Field
                        name="utensils"
                        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
                        component={RenderNativeSelectSimple}
                    /> */}
                    {/* <h4 style={{ marginBottom: "25px" }}>Additional Options</h4>

                    <h6>Catering Disposables (Utensils, Plates, Cup, etc.)</h6>
                    <p style={{ marginBottom: "0px" }}>Would you also like to include Catering Disposables that may include plates, napkins, cups, utensils, etc for an additional 15.0% change?</p>
                    <p className="text-muted">(Catering Disposables are based on the food items selected.)</p>
                    <Field
                        name="utensils"
                        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
                        component={RenderNativeSelectSimple}
                    /> */}
                    <h4 style={{ marginTop: "25px" }}>Notes</h4>

                    <Field
                        name="notes"
                        type="textarea"
                        label="Notes on order..."
                        rows={3}
                        component={renderInput}
                    />
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
    </div>
}

export default OrderBar;