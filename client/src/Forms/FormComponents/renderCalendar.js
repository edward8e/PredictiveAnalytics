import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const renderDatePicker=(props)=> {
    const { formValue, input:{onChange}, name, meta } = props;
    const {touched, error} = meta;
    const today = new Date();
    const minimum = new Date(today);
    minimum.setDate(minimum.getDate() + 3);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
      clearable
      disablePast
      name={name}
      minDate={minimum}
      value={formValue || minimum}
      format="MM/dd/yyyy"
      helperText={error}
      error={Boolean(touched && error)}
      
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={onChange}
      {...props}
    />
    </MuiPickersUtilsProvider>
  );
}

export default renderDatePicker;