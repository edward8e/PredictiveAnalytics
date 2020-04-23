import React from 'react';
import { Input, Button } from "reactstrap";

const styles = {
    button: {
        fontWeight: 700,
        fontSize: "1.4rem"
    },
    input: {
        display: "none"
    }
}

const RenderCounterSquare = (props) => {
    const { field: { onChange, name, value }, form: { setFieldValue } } = props;

    return <div style={{ display: "flex" }}>
        <Button
            style={styles.button}
            active={value === props.options[0]}
            outline
            color="success"
            className="btn-square"
            onClick={() => setFieldValue(name,props.options[0])}>
            {props.options[0]}
        </Button>
        <Input
            value={value}
            onChange={onChange}
            disabled
            style={styles.input}
        />
        <Button
            style={styles.button}
            active={value === props.options[1]}
            outline color="success"
            className="btn-square"
            onClick={() => setFieldValue(name,props.options[1])} >
            {props.options[1]}
        </Button>
    </div>
}

export default RenderCounterSquare;