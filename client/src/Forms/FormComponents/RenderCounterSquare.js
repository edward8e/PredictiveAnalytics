import React, { useState, useEffect } from 'react';
import { Input, Button } from "reactstrap";

const styles = {
    button: {
        width: "50px",
        height: "50px",
        fontWeight:700,
        fontSize:"1.4rem"
    },
    input: {
        backgroundColor: "#c8ced3",
        width: "50px",
        height: "50px",
        textAlign: "center",
        border: "0px",
        padding: "0px",
        fontWeight:700,
        fontSize:"1.4rem",
        color:"black"
    }
}

const RenderCounterSquare = (props) => {
    const { field, form: { setFieldValue }, name } = props;
    const [count, setCount] = useState(1)
    useEffect(() => {
        setFieldValue(field.name, count)
    }, [count])

    const increaseValue = () => {
        setCount(count + 1)
    };
    const decreaseValue = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    };

    return <div style={{ backgroundColor: "#c8ced3", display: "flex" }}>
        <Button style={styles.button} color="secondary" className="btn-square" onClick={() => decreaseValue()}> - </Button>
        <Input
            {...field}
            disabled
            style={styles.input}
        />
        <Button style={styles.button} color="secondary" className="btn-square" onClick={() => increaseValue()} >+</Button>
    </div>
}

export default RenderCounterSquare;