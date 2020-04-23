import React, { Fragment } from "react";
import { Input, FormFeedback } from "reactstrap";

const renderField = ({ input, label, type, meta, placeholder, rows, maxLength, text, disabled }) => {
  const checkError = meta.error && meta.touched;
  return (
    <Fragment>
      <Input
        type={type}
        {...input}
        placeholder={placeholder}
        autoComplete="off"
        invalid={checkError}
        rows={rows}
        maxLength={maxLength}
        value={text}
        disabled={disabled}
      />
      {renderError(meta)}
    </Fragment>
  );
};

//Functions
const renderError = ({ touched, error }) => {
    if (touched && error) {
      return <FormFeedback>{error}</FormFeedback>;
    }
  };
export default renderField;
