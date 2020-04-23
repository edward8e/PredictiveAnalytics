import React from 'react';
import { FormControl, Select, FormLabel, FormHelperText } from '@material-ui/core';

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

const renderNativeSelect = ({ ...props }) => {
  const { formValue, options, label, input: { onChange }, name, meta } = props;
  const { touched, error } = meta;
  return <FormControl variant="outlined" style={styles.formControl} error={Boolean(touched && error)}>
    <FormLabel component="legend">{label}</FormLabel>
    <Select
      native
      value={formValue}
      onChange={onChange}
      inputProps={{
        name: name,
        id: 'outlined-age-native-simple',
      }}
    >
      <option value="" />
      {options.map(({ label, value }) => (
        <option key={label} value={value} >
          {label}
        </option>
      ))}
    </Select>
    {renderError(meta)}
  </FormControl>
}

const renderError = ({ touched, error }) => {
  if (touched && error) {
    return <FormHelperText>{error}</FormHelperText>
  }

}

export default renderNativeSelect;