import React, { useState } from 'react';

const AccountPageTitle = ({ text, onSubmit, active }) => {
  const [hover, setHover] = useState(false);

  return <div style={{
    width: "100%",
    padding: "10px",
    backgroundColor: active ? "#17a2b8" : hover ? "#a2d9e2" : "white",
    color: active ? "white" : "black"
  }}
    onMouseEnter={() => { setHover(true) }}
    onMouseLeave={() => { setHover(false) }}
    onClick={() => { onSubmit() }}
  >
    {text}
  </div>

}

export default AccountPageTitle;