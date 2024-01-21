import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = React.useContext(AppContext);
  return <Route>{() => (loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />)}</Route>;
};

export default ProtectedRoute;
