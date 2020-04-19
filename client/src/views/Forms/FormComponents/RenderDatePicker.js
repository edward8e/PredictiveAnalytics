import "react-datepicker/dist/react-datepicker.css";
import React from 'react';
import DatePicker from 'react-datepicker';
import TextField from '@material-ui/core/TextField';

const RenderDatePicker = (props) => {
    const { field, form:{setFieldValue} } = props;
    const today = new Date();
    const minimum = new Date(today);
    minimum.setDate(minimum.getDate() + 3);

    return <DatePicker
    customInput={<TextField id="outlined-basic" variant="outlined" />}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || minimum}
        onChange={val => { setFieldValue(field.name, val);}}
        minDate={minimum}
    />
}

export default RenderDatePicker;