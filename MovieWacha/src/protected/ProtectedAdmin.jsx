import React from 'react'
import PropTypes from 'prop-types'

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from '../services/Authentication.context';

const ProtectedAdmin = ({children}) => {

  const { user } = useContext(AuthenticationContext);
    console.log(user, "protected")
    if(user.role !== "Admin")
        return <Navigate to="/userNotPermis" replace />;

  return children;
};

ProtectedAdmin.propTypes = {
  children: PropTypes.object,
  
}

export default ProtectedAdmin