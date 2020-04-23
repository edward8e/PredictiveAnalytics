import "react-widgets/dist/css/react-widgets.css";
import React, { Fragment, Component } from "react";
import { Alert } from "reactstrap";
import { SelectList } from "react-widgets";

class renderSelectList extends Component {
  render() {
    const { input, meta, data, valueField, textField } = this.props;
    if (this.props.input.value !== "") {
      meta.touched = true;
    }
    return (
      <Fragment>
        <SelectList
          {...input}
          valueField={valueField}
          textField={textField}
          onBlur={() => input.onBlur()}
          data={data}
        />
        {renderError(meta)}
      </Fragment>
    );
  }
}

//Functions
function renderError({ touched, error }) {
  if (touched && error) {
    return <Alert color="danger">{error}</Alert>;
  }
}

export default renderSelectList;
