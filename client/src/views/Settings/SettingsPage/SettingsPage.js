import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Card, CardHeader, CardBody } from "reactstrap";
import SettingsForm from '../../Forms/SettingsForm/SettingsForm';
import {fetchBusiness, saveSettings} from '../../../actions';
import { ToastContainer, toast } from 'react-toastify';

const SettingsPage = () => {
  const settings = useSelector(state=>state.business.settings);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{dispatch(fetchBusiness());},[dispatch])

  const onSubmit = (formValues)=>{
    dispatch(saveSettings(formValues));
    toast.success("Settings Saved");
    history.push('/dashboard/settings');
  }
  const containerStyle = {
    zIndex: 1999
  };
  return (
    <Card>
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
      <CardHeader>
        <strong>Settings</strong>
        </CardHeader>
      <CardBody>
        {!_.isEmpty(settings) &&<SettingsForm onSubmit={onSubmit} initialValues={settings}/>}
       
      </CardBody>
    </Card>
  );
}

export default SettingsPage;
