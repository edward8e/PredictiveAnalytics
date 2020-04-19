import React from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import renderInput from "../FormComponents/renderInput";

const isPhoneNumber = (value) => /^\+\d{8,11}(,\+\d{8,11})*$/.test(value); 
const schema = yup.object({
    deliveryMinimum: yup.number().required(),
    deliveryDistance: yup.number().required(),
    baseDeliveryCharge: yup.number().required(),
    baseDeliveryChargeMiles: yup.number().required(),
    perMileCharge: yup.number().required(),
    pickupMinimum: yup.number().required(),
    taxRate: yup.number().required(),
    phoneNumbers: yup.string()
    .transform((value) => Array.from(new Set(value.split(';'))).join(';')) // dedupe - optional step
    .required()
    .test(
      'phoneNumbers',
      'Invalid phone numbers',
      (value) => value && value.split(';').every(isPhoneNumber)
    ),
});

const PasswordResetForm = ({ onSubmit, initialValues }) => {
    return (
        <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
            deliveryMinimum: initialValues == null ? '' : initialValues.deliveryMinimum,
            deliveryDistance: initialValues == null ? '' : initialValues.deliveryDistance,
            baseDeliveryCharge: initialValues == null ? '' : initialValues.baseDeliveryCharge,
            baseDeliveryChargeMiles: initialValues == null ? '' : initialValues.baseDeliveryChargeMiles,
            perMileCharge: initialValues == null ? '' : initialValues.perMileCharge,
            pickupMinimum: initialValues == null ? '' : initialValues.pickupMinimum,
            taxRate: initialValues == null ? '' : initialValues.taxRate,
            phoneNumbers: initialValues == null ? '' : initialValues.phoneNumbers
        }}>
            {({ handleSubmit, handleChange, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <dl className="row">
                        <dt className="col-sm-3">Delivery Minimum</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="deliveryMinimum"
                                type="number"
                                label="Delivery Minimum"
                                icon="icon-action-undo"
                                component={renderInput}
                            /></dd>
                        <dt className="col-sm-3">Delivery Max Distance(miles)</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="deliveryDistance"
                                type="number"
                                label="Delivery Max Distance"
                                icon="icon-graph"
                                component={renderInput}
                            /></dd>
                        <dt className="col-sm-3">Base Delivery Charge</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="baseDeliveryCharge"
                                type="number"
                                label="Base Delivery Charge"
                                component={renderInput}
                            /></dd>
                        <dt className="col-sm-3">Charge more after how many miles?</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="baseDeliveryChargeMiles"
                                type="number"
                                label="Miles"
                                component={renderInput}
                            /></dd>
                        <dt className="col-sm-3">How much to charge after per mile after base miles exceeded?</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="perMileCharge"
                                type="number"
                                label="Per Mile"
                                component={renderInput}
                            /></dd>
                        <dt className="col-sm-3">Pickup Minimum</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="pickupMinimum"
                                type="number"
                                label="Pickup Minimum"
                                icon="icon-action-redo"
                                component={renderInput}
                            /></dd>
                        <dt className="col-sm-3">Phone Notifications</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="phoneNumbers"
                                type="text"
                                label="+15555555"
                                icon="icon-phone"
                                component={renderInput}
                            /></dd>
                         <dt className="col-sm-3">Tax Rate(%)</dt>
                        <dd className="col-sm-9">
                            <Field
                                name="taxRate"
                                type="number"
                                label="Example: 0.0775"
                                icon="icon-credit-card"
                                component={renderInput}
                            /></dd>
                    </dl>
                    <Button type="submit" color="primary" className="px-4">
                        Save
          </Button>
                </Form>
            )}
        </Formik>
    );
}

export default PasswordResetForm;
