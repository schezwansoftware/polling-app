import React from 'react';
import {
    Route
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component,isAuthenticated,...rest }) => (
  <Route {...rest} render={(props) => isAuthenticated ? (<Component {...rest} {...props} />) : (<h1>You are not Authorised to view this page</h1>)} />
);

export default PrivateRoute;
