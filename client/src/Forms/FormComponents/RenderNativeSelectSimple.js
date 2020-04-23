import React from 'react';
import { Select, FormHelperText,FormControl } from '@material-ui/core';

const styles = {
    formControl: {
      width: "100%"
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    }
  };

const RenderNativeSelectSimple = (props) => {
    const { options, field: { name, onChange, value },form: { touched, errors } } = props;
    const invalid = Boolean(!!(touched[name] && errors[name]));
    return <FormControl variant="outlined" style={styles.formControl} error={invalid}>
        <Select
        native
        value={value}
        onChange={onChange}
        style={{ width: "100%"}}
        inputProps={{
            name: name,
            id: 'age-native-simple',
        }}
    >
        <option value="" />
        {options.map(({ label, value }) => (
            <option key={label} value={value} >
                {label}
            </option>
        ))}
    </Select>
    {invalid && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
}

export default RenderNativeSelectSimple;