import _ from 'lodash';
import React, { Fragment } from "react";
import { FormGroup, Input, Label } from 'reactstrap';

const renderRadio = (props) => {
  const { input, options } = props;
  return (
    <Fragment>
      <FormGroup>{_.map(options, ({ value, label }) => {
        return <FormGroup check key={value} className="radio">
          <Input className="form-check-input" id={value} type="radio" name={input.name} value={value} />
          <Label check className="form-check-label" htmlFor={value}>{label}</Label>
        </FormGroup>
      })}</FormGroup>

    </Fragment>
  );
}




export default renderRadio;
