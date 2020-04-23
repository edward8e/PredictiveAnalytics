import _ from "lodash";
import React from 'react';
import {
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";

const renderInput = (props) => {
    const { icon, label, field, form: { touched, errors }, rows, type, options } = props;
    const invalid = Boolean(!!(touched[field.name] && errors[field.name]));
    return <InputGroup className="mb-3">
        {icon && <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <i className={icon} />
            </InputGroupText>
        </InputGroupAddon>}
        <Input
            type={type}
            placeholder={label}
            invalid={!!(touched[field.name] && errors[field.name])}
            rows={rows}
            {...field}
            // {...props}
        >
            {renderOptions(type,options)}
        </Input>
        {invalid && <FormFeedback>{errors[field.name]}</FormFeedback>}
    </InputGroup>
}

const renderOptions = (type,options) => {
    if (type === "select") {
        return _.map(options, ({ value, label }) => {
            return <option key={value} value={value}>{label}</option>
        })
    }
}
export default renderInput;