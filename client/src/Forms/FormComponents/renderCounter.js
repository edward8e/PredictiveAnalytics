import React, { useState } from "react";
import { Input, Button } from "reactstrap";

const RenderCounter = ({ handleValueChange }) => {
  const [currentValue, setCurrentValue] = useState(1);

  const handleChange = (event, value) => {
    const count = event ? parseInt(event.target.value.replace(/[^0-9]+/g, "")) || 1 : value;
    setCurrentValue(count)
    handleValueChange(count);
  };
  const increaseValue = () => {
    return currentValue + 1;
  };
  const decreaseValue = () => {
    if (currentValue > 1) {
      return currentValue - 1;
    }
    return 1;
  };
  return (<div style={{ display: "flex" }}>
    <Button color="primary" onClick={() => { handleChange(false, decreaseValue()) }} > - </Button>
    <Input
      onChange={event => { handleChange(event, null); }}
      value={currentValue}
      min={1}
    />
    <Button color="primary" onClick={() => { handleChange(false, increaseValue()) }}>+</Button>
  </div>
  );
}

export default RenderCounter;
