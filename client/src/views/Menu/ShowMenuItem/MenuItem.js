import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardBody, Badge, Button } from "reactstrap";
import { AppSwitch } from '@coreui/react'
import { formatMoney } from '../../../utils';
import { toggleMenuItem } from '../../../actions';
import UpdateMenuItemModal from '../../../components/Modals/UpdateMenuItemModal';

const MenuItem = (props) => {
    const {_id, itemName, description, category: { categoryName }, price, active} = props.menuItem
    const dispatch = useDispatch();
    const [toggleUpdate, setToggleUpdate] = useState(false);

    const onSwitch = async () => {
        await dispatch(toggleMenuItem({ _id, toggle: !active }));
    }
    return <Card>
        <UpdateMenuItemModal menuItem={props.menuItem} toggle={toggleUpdate} onToggle={() => setToggleUpdate(!toggleUpdate)} />
        <CardHeader>
            <span>{itemName}{" "}
                <Badge className="mr-1" color="primary">
                    {categoryName}
                </Badge>{" "}<span>- <strong>{formatMoney(price)}</strong></span>
            </span>
            <div className="float-right" style={{ display: "flex", alignItems: "center" }}><Button color="info"
                size="sm" onClick={() => setToggleUpdate(!toggleUpdate)}>Edit</Button>{" "}
                <AppSwitch onClick={() => onSwitch()} className={'mx-1'} color={'success'} label checked={active} /></div>
        </CardHeader>
        <CardBody>{description}</CardBody>
    </Card>

}

export default MenuItem;