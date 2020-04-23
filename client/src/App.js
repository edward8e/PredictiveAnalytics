import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/Utils';
// import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './actions';


// Pages
import MainPage from './views/MachineLearningDash/MainPage';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import ResetPassword from './views/PasswordReset/PasswordReset';
import ValidateAccount from './views/ValidateAccount/ValidateAccount';
import Page404 from './views/Page404/Page404';
import Page500 from './views/Page500/Page500';


const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchUser()) }, [dispatch])
  const renderPrivate = () => {
    if (auth === null) {
      return <Fragment>loading...</Fragment>;
    }
    return (
      <PrivateRoute
        authed={auth}
        path="/"
        component={MainPage}
        authLevel="admin"
      />
    );
  }

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" name="Order" render={props => <MainPage {...props} />} />
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/register/:token" name="Register Page" render={props => <ValidateAccount {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route exact path="/reset/:token" name="Password Reset" render={props => <ResetPassword {...props} />} />
          <Route exact path="/forgotPassword" name="Page 500" render={props => <ForgotPassword {...props} />} /> */}
           {renderPrivate()}
          <PrivateRoute authed={auth} path="/" component={MainPage} authLevel="users" />
        </Switch>
    </BrowserRouter>
  );
}


export default App;
