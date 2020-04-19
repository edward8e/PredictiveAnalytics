import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import { getDate, formatAMPM } from '../../../utils';
import UpdateCategoryModal from '../../../components/Modals/UpdateCategoryModal';
// import DeleteCategoryModal from '../../../components/Modals/DeleteCategoryModal';

const CategoryItem = (props) => {
    const [toggleUpdate, setToggleUpdate] = useState(false);
    // const [toggleDelete, setToggleDelete] = useState(false);
    const { categoryName, description, dateUpdated, _user: { firstName, lastName } } = props.category
    return <Card>
        <UpdateCategoryModal category={props.category} toggle={toggleUpdate} onToggle={() => setToggleUpdate(!toggleUpdate)} />
        {/* <DeleteCategoryModal category={props.category} toggle={toggleDelete} onToggle={() => setToggleDelete(!toggleDelete)} /> */}
        <CardHeader>
            {categoryName}
            <div className="float-right"><Button color="info"
                size="sm" onClick={() => setToggleUpdate(!toggleUpdate)}>Edit</Button>{" "}
                {/* <Button onClick={() => setToggleDelete(!toggleDelete)} color="danger" size="sm">Delete</Button> */}
                </div>
        </CardHeader>
        <CardBody>{description}</CardBody>
        <CardFooter>
            <div>{"Created by: " + firstName + " " + lastName}</div>
            <div>{"Date Modified: " + getDate(dateUpdated) + " " + formatAMPM(dateUpdated)}</div></CardFooter>
    </Card>
}

export default CategoryItem;