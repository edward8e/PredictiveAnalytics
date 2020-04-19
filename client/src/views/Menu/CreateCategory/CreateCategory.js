import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import CategoryForm from '../../Forms/CategoryForm/CategoryForm';

const CreateCategory = () => {
  return (
    <Card>
      <CardHeader>
        <strong>Category</strong> create
        </CardHeader>
      <CardBody>
        <CategoryForm formType="new" />
      </CardBody>
    </Card>
  );
}

export default CreateCategory;
