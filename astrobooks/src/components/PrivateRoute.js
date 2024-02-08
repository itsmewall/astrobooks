import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const PrivateRoute = () => {
  const { currentUser, isSubscribed } = useAuth(); // Agora usa isSubscribed do contexto

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!isSubscribed) {
    return <Navigate to="/assinatura" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
