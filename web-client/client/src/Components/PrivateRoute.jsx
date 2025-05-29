import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.replace('/');
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return children;
};

export default PrivateRoute;
