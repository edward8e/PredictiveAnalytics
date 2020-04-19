import React from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Card, CardHeader, CardBody } from "reactstrap";
import CreateBusinessForm from '../../Forms/CreateBusiness/CreateBusinessForm';
import {createBusiness} from '../../../actions';

const CreateBusiness = ()=> {
  const dispatch = useDispatch();
  const history = useHistory();

const onSubmit = async(formValues)=>{
  await dispatch(createBusiness(formValues));
  history.push('/dashboard');
}

    return (
      <Card>
        <CardHeader>
          <strong>Create Bussiness</strong> create
        </CardHeader>
        <CardBody>
          <CreateBusinessForm onSubmit={onSubmit}/>
        </CardBody>
      </Card>
    );
  }


export default CreateBusiness;
