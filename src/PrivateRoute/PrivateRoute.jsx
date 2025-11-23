import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
  
  const {user, loading} = useContext(AuthContext);
  
  if(loading) {
    return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner text-primary w-20"></span>
    </div>
  );
  }

  if(!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>
  }

  return children;
};

export default PrivateRoute;