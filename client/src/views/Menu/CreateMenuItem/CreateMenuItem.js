import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import MenuItemForm from "../../Forms/MenuItemForm/MenuItemForm";

class CreateMenuItem extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Menu Item</strong> create
        </CardHeader>
        <CardBody>
          <MenuItemForm formType="new" />
        </CardBody>
      </Card>
    );
  }
}

export default CreateMenuItem;
