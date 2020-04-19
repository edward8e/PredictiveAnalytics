import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './actions';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const Account = React.lazy(() => import('./views/Pages/Account'));
const ForgotPassword = React.lazy(() => import('./views/Pages/ForgotPassword'));
const ResetPassword = React.lazy(()=> import('./views/Pages/PasswordReset'));
const ValidateAccount = React.lazy(()=> import('./views/Pages/ValidateAccount'));

const Order = React.lazy(() => import('./views/Pages/Order'));

const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchUser()) }, [dispatch])
  //put all private paths here
  const renderPrivate = () => {
    if (auth === null) {
      return <Fragment>loading...</Fragment>;
    }
    return (
      <PrivateRoute
        authed={auth}
        path="/dashboard"
        component={DefaultLayout}
        authLevel="admin"
      />
    );
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/" name="Order" render={props => <Order {...props} />} />
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/register/:token" name="Register Page" render={props => <ValidateAccount {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route exact path="/reset/:token" name="Password Reset" render={props => <ResetPassword {...props} />} />
          <Route exact path="/forgotPassword" name="Page 500" render={props => <ForgotPassword {...props} />} />
          {renderPrivate()}
          <PrivateRoute authed={auth} path="/account" component={Account} authLevel="users" />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}


export default App;
