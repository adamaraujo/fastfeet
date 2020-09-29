import React from 'react';
import { useSelector } from 'react-redux';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';

const Routes: React.FC = () => {
  const signed = useSelector((state) => state.auth.signed);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
